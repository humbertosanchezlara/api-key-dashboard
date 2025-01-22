export default function Toast({ message, onClose, type = 'default' }) {
  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    default: 'bg-gray-800',
  }[type];

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white/60 hover:text-white">×</button>
    </div>
  );
} 