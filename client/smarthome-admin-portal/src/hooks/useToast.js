import { useState } from "react";

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const ToastRenderer = () => (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-lg animate-slide-in
            ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          <span className="font-bold">{type === "success" ? "✔" : "✖"}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  );

  return { showToast, ToastRenderer };
}
