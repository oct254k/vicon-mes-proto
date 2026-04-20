interface PageHeaderProps {
  title: string;
  accent: string;
  nodeRef: string;
  status?: string;
  description?: string;
}

export function PageHeader({ title, accent, nodeRef, status = "CALIBRATED", description }: PageHeaderProps) {
  return (
    <header className="mb-10 relative">
      <div className="absolute -left-8 top-0 w-1 h-12 bg-primary-accent" />
      <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase font-headline mb-2 leading-none">
        {title} <span className="text-white">{accent}</span>
      </h1>
      <div className="flex items-center gap-4 flex-wrap mb-2">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant bg-surface-container-high px-2 py-1">
          Node: {nodeRef}
        </span>
        <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
          System Status: {status}
        </span>
      </div>
      {description && (
        <p className="text-lg text-on-surface-variant/80 font-body leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </header>
  );
}
