const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-5 border-l-4 border-blue-500">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
          {event.category}
        </span>
      </div>

      {event.description && (
        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
      )}

      <p className="text-gray-500 text-sm mb-4">
        📅 {new Date(event.date).toLocaleDateString()}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(event)}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event._id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventCard;
