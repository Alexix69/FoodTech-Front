interface CompletedOrdersButtonProps {
  count: number;
  onToggle: () => void;
}

export const CompletedOrdersButton = ({
  count,
  onToggle,
}: CompletedOrdersButtonProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Open completed orders"
      className="fixed bottom-6 right-6 z-50 gold-gradient text-midnight shadow-2xl shadow-primary/20 rounded-full h-14 w-14 flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <span className="material-symbols-outlined text-2xl">receipt_long</span>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center border border-white/10">
          {count}
        </span>
      )}
    </button>
  );
};
