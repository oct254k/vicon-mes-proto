export function TelemetryStrip() {
  return (
    <>
      <div className="fixed bottom-0 left-72 right-0 h-1 bg-primary-container z-50" />
      <div className="fixed bottom-0 right-0 bg-surface-container-highest px-6 py-1 z-50">
        <span className="font-label text-xs uppercase tracking-widest text-primary-accent font-bold">
          System Active | Port 8080 | Secure Link
        </span>
      </div>
    </>
  );
}
