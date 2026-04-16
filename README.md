# Calendly Clone - Full Stack Application

A complete Calendly clone with React frontend and Node.js/PostgreSQL backend.

## 🚀 Quick Start
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Availability**: Dynamic time slot management
- **Meeting Management**: View and manage scheduled meetings
- **Smooth Animations**: Calendly-like user experience with transitions
- **Time Slot Generation**: Automatic availability calculation based on working hours
- **Booking Confirmation**: Professional confirmation page with calendar integration

## Tech Stack

### Frontend
- React.js with JavaScript
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Lucide Icons for UI elements

### Backend
- Node.js with JavaScript
- Express.js for REST API
- PostgreSQL for database
- CORS for frontend-backend communication
- dotenv for environment management

## Project Structure

```
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service functions
│   │   └── App.js           # Main application component
├── backend/                  # Node.js Express backend
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API routes
│   │   ├── config/          # Database configuration
│   │   └── index.js         # Server entry point
│   └── database/
│       ├── schema.sql       # Database schema
│       └── setup.sql        # Complete setup script
├── README.md               # This file
└── package.json            # Root package.json for convenience scripts
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Database Setup

First, create a PostgreSQL database:

```sql
CREATE DATABASE calendly_clone;
```

Then run the setup script to create tables and sample data:

```bash
# Navigate to backend directory
cd backend

# Run the setup script (update connection details first)
psql -h localhost -U your_username -d calendly_clone -f database/setup.sql
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/calendly_clone
DB_HOST=localhost
DB_PORT=5432
DB_NAME=calendly_clone
DB_USER=your_username
DB_PASSWORD=your_password

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

### 3. Installation

Install all dependencies for the project:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 4. Start Development Servers

Start both frontend and backend simultaneously:

```bash
# From the root directory
npm run dev
```

Or start them individually:

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm start
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Default Login

For demo purposes, the application assumes a default user is logged in. The default user has:
- **Email**: admin@calendlyclone.com
- **Password**: admin123 (for reference, not used in this demo)

## API Endpoints

### Event Types
- `GET /api/event-types` - Get all event types
- `GET /api/event-types/:id` - Get single event type
- `POST /api/event-types` - Create new event type
- `PUT /api/event-types/:id` - Update event type
- `DELETE /api/event-types/:id` - Delete event type

### Availability
- `GET /api/availability` - Get availability settings
- `PUT /api/availability` - Update availability settings

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/time-slots/:eventTypeId?date=YYYY-MM-DD` - Get available time slots

## Features Implementation

### Admin Features (Assumed Logged In)
- **Dashboard**: Overview of event types, upcoming meetings, and statistics
- **Event Type Management**: Create, edit, delete event types with custom colors and locations
- **Availability Management**: Set working hours for each day of the week
- **Meeting Management**: View, search, and cancel scheduled meetings
- **Quick Templates**: Pre-configured availability patterns

### Public Features
- **Event Type Selection**: Browse available meeting types
- **Date/Time Selection**: Interactive calendar with available time slots
- **Booking Form**: Simple form with name, email, and optional notes
- **Confirmation Page**: Professional confirmation with calendar integration
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Responsive Design
- Mobile-first approach with breakpoints at 640px, 768px, and 1024px
- Touch-friendly interface elements
- Optimized layouts for different screen sizes
- Smooth animations and transitions

## Development Notes

### Database Schema
The application uses PostgreSQL with the following main tables:
- `users` - User accounts
- `event_types` - Meeting types with duration, location, and styling
- `availability` - Working hours for each day of the week
- `bookings` - Scheduled meetings with status tracking

### Time Slot Generation
The backend automatically generates available time slots based on:
- Event type duration
- User's availability settings
- Existing bookings (to prevent double-booking)
- Configurable time intervals (30-minute slots)

### Frontend Architecture
- Component-based React with JavaScript
- Custom API service functions
- Responsive design with Tailwind CSS
- Smooth animations and micro-interactions

## Production Deployment

### Environment Variables
Update the `.env` file for production:
- Set `NODE_ENV=production`
- Use a secure `JWT_SECRET`
- Update `FRONTEND_URL` to your production domain
- Use a production database URL

### Database Setup
1. Create a production PostgreSQL database
2. Run the `setup.sql` script
3. Update connection string in `.env`

### Build and Deploy
```bash
# Build frontend
cd frontend && npm run build

# Start production server (no build needed for backend)
cd ../backend && npm start
```

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please open an issue on the GitHub repository.
