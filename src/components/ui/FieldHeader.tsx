interface FieldHeaderProps {
  title: string;
  moduleRef?: string;
}

export function FieldHeader({ title, moduleRef }: FieldHeaderProps) {
  return (
    <div className="mb-8 flex justify-between items-end border-b border-outline-variant/10 pb-4">
      <h3 className="font-label uppercase tracking-widest text-sm font-bold text-primary-container">
        {title}
      </h3>
      {moduleRef && (
        <span className="text-xs opacity-30 font-label">{moduleRef}</span>
      )}
    </div>
  );
}
