# 📅 Event Planner - MERN Stack Application

A simple and clean event management application built with MongoDB, Express, React, and Node.js.

## Features

✅ **CRUD Operations**: Create, Read, Update, and Delete events  
✅ **Field Validation**: Title and Date are required fields  
✅ **Category Filter**: Filter events by category (Work, Personal, Social, Education, Other)  
✅ **Modern UI**: Built with React and Tailwind CSS  
✅ **RESTful API**: Clean backend with Express and MongoDB

## Project Structure

```
Event-Planner/
├── backend/
│   ├── controllers/
│   │   └── eventController.js
│   ├── models/
│   │   └── Event.js
│   ├── routes/
│   │   └── eventRoutes.js
│   ├── server.js
│   └── package.json
├── src/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create a .env file with your MongoDB credentials
# Copy the following into backend/.env:
MONGO_URI=mongodb+srv://abdulrehman2001y_db_user:e0bXwyS9HjQylgsy@cluster0.swt23cx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=supersecretkey

# Start the backend server
npm start
# or for development with auto-restart:
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate back to root folder
cd ..

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port shown in terminal)

## API Endpoints

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| GET    | `/api/events`               | Get all events         |
| GET    | `/api/events?category=Work` | Get events by category |
| POST   | `/api/events`               | Create a new event     |
| PUT    | `/api/events/:id`           | Update an event        |
| DELETE | `/api/events/:id`           | Delete an event        |

## Event Model

```javascript
{
  title: String (required),
  description: String,
  date: Date (required),
  category: String (required, enum: ['Work', 'Personal', 'Social', 'Education', 'Other'])
}
```

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

### Frontend

- React (Vite)
- Axios
- Tailwind CSS

## Usage

1. **Add Event**: Click the "+ Add Event" button
2. **Edit Event**: Click "Edit" on any event card
3. **Delete Event**: Click "Delete" on any event card
4. **Filter Events**: Use the category dropdown to filter events

## Notes

- Make sure MongoDB URI is correctly set in the `.env` file
- Backend must be running before starting the frontend
- The app uses port 5000 for backend and 5173 for frontend by default

---

Made with ❤️ for Assessment Task
