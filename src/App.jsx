import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Alert from "./components/Alert";
import FilterBar from "./components/FilterBar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import Modal from "./components/Modal";

const API_URL = import.meta.env.VITE_API_URL + "/api/events";

function App() {
  const [events, setEvents] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: null });
  const [updateModal, setUpdateModal] = useState({ isOpen: false, formData: null });

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
    if (editingEvent) {
      // Show update confirmation modal
      setUpdateModal({ isOpen: true, formData });
    } else {
      // Create new event without confirmation
      await createEvent(formData);
    }
  };

  const createEvent = async (formData) => {
    try {
      await axios.post(API_URL, formData);
      showAlert("Event created successfully!", "success");
      fetchEvents(filteredCategory);
      resetForm();
    } catch (error) {
      showAlert(error.response?.data?.message || "Error saving event", "error");
    }
  };

  const confirmUpdate = async () => {
    try {
      await axios.put(`${API_URL}/${editingEvent._id}`, updateModal.formData);
      showAlert("Event updated successfully!", "success");
      setUpdateModal({ isOpen: false, formData: null });
      fetchEvents(filteredCategory);
      resetForm();
    } catch (error) {
      showAlert(error.response?.data?.message || "Error saving event", "error");
      setUpdateModal({ isOpen: false, formData: null });
    }
  };

  const handleDelete = (id) => {
    setDeleteModal({ isOpen: true, eventId: id });
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deleteModal.eventId}`);
      showAlert("Event deleted successfully!", "success");
      fetchEvents(filteredCategory);
      setDeleteModal({ isOpen: false, eventId: null });
    } catch {
      showAlert("Error deleting event", "error");
      setDeleteModal({ isOpen: false, eventId: null });
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

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={deleteModal.isOpen}
          onClose={() => setDeleteModal({ isOpen: false, eventId: null })}
          onConfirm={confirmDelete}
          title="Delete Event"
          message="Are you sure you want to delete this event?"
          confirmText="Delete"
          cancelText="Cancel"
          confirmButtonClass="bg-red-500 hover:bg-red-600"
        />

        {/* Update Confirmation Modal */}
        <Modal
          isOpen={updateModal.isOpen}
          onClose={() => setUpdateModal({ isOpen: false, formData: null })}
          onConfirm={confirmUpdate}
          title="Update Event"
          message="Are you sure you want to update this event?"
          confirmText="Update"
          cancelText="Cancel"
          confirmButtonClass="bg-yellow-500 hover:bg-yellow-600"
        />
      </div>
    </div>
  );
}

export default App;
