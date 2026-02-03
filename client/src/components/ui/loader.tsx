export const BouncingDots = () => (
  <div className="flex space-x-1 items-center justify-center h-full">
    <div className="w-3 h-3 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-3 h-3 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-3 h-3 bg-neutral-400 rounded-full animate-bounce"></div>
  </div>
);
