"use client";

interface Column {
  key: string;
  label: string;
  className?: string;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: Record<string, string | number>[];
  bufferCount?: number;
}

export function DataTable({ title, columns, data, bufferCount }: DataTableProps) {
  return (
    <section className="col-span-12 bg-surface-container-lowest mt-4">
      <div className="p-4 bg-surface-container-highest/30 flex justify-between items-center border-l-4 border-primary-accent">
        <h3 className="font-headline font-black text-sm uppercase tracking-widest">
          {title}{" "}
          {bufferCount !== undefined && (
            <span className="opacity-30 font-light ml-2">
              | Buffer: {String(bufferCount).padStart(3, "0")} Entries
            </span>
          )}
        </h3>
        <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary-accent">
          refresh
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container border-b border-outline-variant/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 font-label uppercase tracking-widest text-xs opacity-50 font-semibold"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-headline text-sm">
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-outline-variant/5 hover:bg-surface-container-highest/20 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-2 tabular-nums ${col.className || ""}`}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
