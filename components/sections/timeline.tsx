interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-8 border-l border-slate-200 pl-6 dark:border-slate-700">
      {items.map((item) => (
        <li key={item.year} className="ml-4">
          <div className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full border-2 border-white bg-primary-500 dark:border-slate-950" />
          <div className="space-y-2 rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-900/60 dark:ring-slate-700/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-500">{item.year}</span>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
