// ============================================================================
// IndexedDB Persistence Layer — Multi-tab Synced via BroadcastChannel
// ============================================================================

import { openDB, type IDBPDatabase } from "idb";
import type { Run } from "@/types";

const DB_NAME = "bg3-honor-companion";
const DB_VERSION = 1;
const RUNS_STORE = "runs";
const META_STORE = "meta";
const CHANNEL_NAME = "bg3-sync";

interface BG3Database {
  runs: {
    key: string;
    value: Run;
    indexes: { "by-updated": string };
  };
  meta: {
    key: string;
    value: { key: string; value: string };
  };
}

let dbInstance: IDBPDatabase<BG3Database> | null = null;

async function getDB(): Promise<IDBPDatabase<BG3Database>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<BG3Database>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(RUNS_STORE)) {
        const runStore = db.createObjectStore(RUNS_STORE, { keyPath: "id" });
        runStore.createIndex("by-updated", "updatedAt");
      }
      if (!db.objectStoreNames.contains(META_STORE)) {
        db.createObjectStore(META_STORE, { keyPath: "key" });
      }
    },
  });

  return dbInstance;
}

// ---------------------------------------------------------------------------
// CRUD Operations
// ---------------------------------------------------------------------------

export async function saveRun(run: Run): Promise<void> {
  const db = await getDB();
  await db.put(RUNS_STORE, run);
  broadcastChange({ type: "run-updated", runId: run.id });
}

export async function getRun(id: string): Promise<Run | undefined> {
  const db = await getDB();
  return db.get(RUNS_STORE, id);
}

export async function getAllRuns(): Promise<Run[]> {
  const db = await getDB();
  return db.getAllFromIndex(RUNS_STORE, "by-updated");
}

export async function deleteRun(id: string): Promise<void> {
  const db = await getDB();
  await db.delete(RUNS_STORE, id);
  broadcastChange({ type: "run-deleted", runId: id });
}

export async function getMetaValue(key: string): Promise<string | undefined> {
  const db = await getDB();
  const entry = await db.get(META_STORE, key);
  return entry?.value;
}

export async function setMetaValue(key: string, value: string): Promise<void> {
  const db = await getDB();
  await db.put(META_STORE, { key, value });
}

// ---------------------------------------------------------------------------
// Multi-Tab Sync via BroadcastChannel
// ---------------------------------------------------------------------------

interface SyncMessage {
  type: "run-updated" | "run-deleted";
  runId: string;
}

let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  if (typeof BroadcastChannel === "undefined") return null;
  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }
  return channel;
}

function broadcastChange(message: SyncMessage): void {
  getChannel()?.postMessage(message);
}

/**
 * Subscribe to cross-tab sync events. Returns an unsubscribe function.
 */
export function onSyncChange(
  callback: (message: SyncMessage) => void
): () => void {
  const ch = getChannel();
  if (!ch) return () => {};

  const handler = (event: MessageEvent<SyncMessage>) => {
    callback(event.data);
  };

  ch.addEventListener("message", handler);
  return () => ch.removeEventListener("message", handler);
}
