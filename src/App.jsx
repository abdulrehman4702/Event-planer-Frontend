import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Alert from "./components/Alert";
import FilterBar from "./components/FilterBar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";

const API_URL = import.meta.env.VITE_API_URL + "/api/events";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };

  const fetchEvents = useCallback(async (category = "") => {
    try {
      const url = category ? `${API_URL}?category=${category}` : API_URL;
      const response = await axios.get(url);
      setEvents(response.data);
    } catch (error) {
      showAlert("Failed to fetch events", "error");
      console.error("Error fetching events:", error);
    }
  }, []);

  useEffect(() => {
    fetchEvents(filteredCategory);
  }, [filteredCategory, fetchEvents]);

  const handleSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await axios.put(`${API_URL}/${editingEvent._id}`, formData);
        showAlert("Event updated successfully!", "success");
      } else {
        await axios.post(API_URL, formData);
        showAlert("Event created successfully!", "success");
      }
      resetForm();
      fetchEvents(filteredCategory);
    } catch (error) {
      showAlert(error.response?.data?.message || "Error saving event", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      showAlert("Event deleted successfully!", "success");
      fetchEvents(filteredCategory);
    } catch {
      showAlert("Error deleting event", "error");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  
  const resetForm = () => {
    setEditingEvent(null);
    setShowForm(false);
  };

  
  const toggleForm = () => {
    if (showForm) {
      resetForm();
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📅 Event Planner
          </h1>
          <p className="text-gray-600">Manage your events efficiently</p>
        </div>

        <FilterBar
          filteredCategory={filteredCategory}
          onFilterChange={setFilteredCategory}
          onAddClick={toggleForm}
          showForm={showForm}
        />  
        {showForm && (
          <EventForm
            editingEvent={editingEvent}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        )}
        <EventList
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
