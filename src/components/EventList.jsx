import EventCard from "./EventCard";

const EventList = ({ events, onEdit, onDelete }) => {
  if (events.length === 0) {
    return (
      <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">
          No events found. Create your first event!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.length > 0 && events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EventList;
