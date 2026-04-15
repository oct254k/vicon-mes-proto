type StatusType = "running" | "stopped" | "warning" | "idle" | "error";

const styles: Record<StatusType, string> = {
  running: "bg-tertiary/20 text-tertiary",
  stopped: "bg-error/20 text-error",
  warning: "bg-[#f59e0b]/20 text-[#f59e0b]",
  idle: "bg-surface-container-highest text-on-surface-variant",
  error: "bg-error-container text-error",
};

interface StatusBadgeProps {
  type: StatusType;
  label: string;
}

export function StatusBadge({ type, label }: StatusBadgeProps) {
  return (
    <span className={`px-3 py-1 text-xs font-label uppercase tracking-wider font-bold ${styles[type]}`}>
      {label}
    </span>
  );
}
