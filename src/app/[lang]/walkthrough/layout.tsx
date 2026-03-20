import { MapGenieWidget } from "@/components/ui/MapGenieWidget";
import { ReadingProgress } from "@/components/ui/ReadingProgress";

export default function WalkthroughLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReadingProgress />
      {children}
      <MapGenieWidget />
    </>
  );
}
