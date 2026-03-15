import { MapGenieWidget } from "@/components/ui/MapGenieWidget";

export default function WalkthroughLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <MapGenieWidget />
    </>
  );
}
