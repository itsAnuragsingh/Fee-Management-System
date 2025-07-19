<img width="1851" height="1021" alt="image" src="https://github.com/user-attachments/assets/d74a6418-1b55-4643-ab56-7e816c7d9a45" />


# 🎓 Fee Management System

A modern, full-stack fee management system built with React, Node.js, Express, and MongoDB. This application allows students to register, login, view their profile information, and make fee payments through a secure interface.

## ✨ Features

- **Student Authentication**: Secure registration and login system with JWT tokens
- **Automatic Roll Number Generation**: Smart roll number generation based on year and course
- **Student Dashboard**: View all registered students and their fee payment status
- **Profile Management**: Students can view and update their profile information
- **Fee Payment System**: Secure payment processing with card details validation
- **Real-time Updates**: Dynamic UI updates with smooth animations using Framer Motion
- **Responsive Design**: Beautiful, responsive UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **React Router DOM 7** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Fee-management
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables**
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/fee-management
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
Fee-management/
├── backend/
│   ├── controllers/          # Route handlers
│   │   ├── auth.controller.js
│   │   ├── payment.controller.js
│   │   └── student.controller.js
│   ├── lib/
│   │   └── db.js            # Database connection
│   ├── middleware/
│   │   └── auth.middleware.js # Authentication middleware
│   ├── model/               # Database models
│   │   ├── payment.model.js
│   │   └── student.model.js
│   ├── routes/              # API routes
│   │   ├── auth.route.js
│   │   ├── payment.route.js
│   │   └── student.route.js
│   ├── scripts/
│   │   └── seedData.js      # Database seeding
│   ├── index.js             # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PaymentPage.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── utils/
│   │   │   └── auth.js       # Authentication utilities
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register a new student
- `POST /login` - Login student
- `POST /logout` - Logout student
- `GET /me` - Get current authenticated student

### Student Routes (`/api/students`)
- `GET /` - Get all students (protected)
- `PUT /profile` - Update student profile (protected)

### Payment Routes (`/api/payments`)
- `POST /process` - Process fee payment (protected)
- `GET /history` - Get payment history (protected)

## 🎨 Features in Detail

### Student Registration & Authentication
- Secure password hashing using bcrypt
- JWT-based authentication with HTTP-only cookies
- Automatic roll number generation (format: YYCOURSE####)
- Input validation and error handling

### Dashboard
- Display all registered students
- Real-time fee payment status indicators
- Animated table with smooth transitions
- Responsive design for all devices

### Payment System
- Multi-step payment form with progress indicators
- Card number formatting and validation
- Secure payment processing
- Success animations and redirects

### Profile Management
- View personal information including roll number, course, semester
- Update profile details
- Fee payment status display
- Quick access to payment page

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS protection
- Input validation and sanitization
- Protected routes requiring authentication
- Secure cookie handling

## 🎯 Database Schema

### Student Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  rollNo: String (auto-generated, unique),
  feesPaid: Boolean (default: false),
  phone: Number,
  course: String,
  semester: Number (1-8),
  year: Number,
  timestamps: true
}
```

### Payment Model
```javascript
{
  studentId: ObjectId (ref: Student),
  amount: Number (required),
  transactionId: String (required, unique),
  cardholderName: String (required),
  cardNumber: String (required),
  status: String (default: "completed"),
  timestamps: true
}
```

## 🚀 Deployment

The application is configured for deployment on:
- **Backend**: Render.com
- **Frontend**: Vercel

### Environment Variables for Production
```env
PORT=3000
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Development Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Known Issues

- Payment processing is simulated (no real payment gateway integration)
- Email verification is not implemented
- File upload for profile pictures is not available


