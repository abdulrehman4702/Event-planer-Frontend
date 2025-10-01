import { useEffect } from "react";

const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const alertStyles = {
    success: "bg-green-100 border-green-500 text-green-800",
    error: "bg-red-100 border-red-500 text-red-800",
    info: "bg-blue-100 border-blue-500 text-blue-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div
        className={`${alertStyles[type]} border-l-4 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]`}
      >
        <span className="text-2xl font-bold">{icons[type]}</span>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-xl font-bold hover:opacity-70 transition"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Alert;
