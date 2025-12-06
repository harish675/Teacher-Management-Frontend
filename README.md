# Teacher Management Frontend

A modern React-based frontend application for managing teachers, students, and courses. Built with React, Vite, Material-UI, and deployed on Render.

## 🚀 Features

- **Student Management** - View, create, update, and delete student records
- **Teacher Management** - Manage teacher profiles and information
- **Course Management** - Create and manage courses
- **Teacher Assignment** - Assign teachers to courses
- **Student Enrollment** - Enroll students in courses
- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Notifications** - Toast notifications for user actions

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Backend API running (see [Teacher-BE](../Teacher-BE))

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Teacher-FE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/rent-easy/api

# Application Configuration
VITE_APP_TITLE=Student-Teacher Management System
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📚 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Notistack** - Toast notifications
- **Emotion** - CSS-in-JS styling

## 🗂️ Project Structure

```
Teacher-FE/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── Dockerfile          # Docker configuration
├── nginx.conf          # Nginx configuration for production
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t teacher-frontend .
```

### Run Docker Container

```bash
docker run -p 80:80 teacher-frontend
```

The application will be available at `http://localhost`

## ☁️ Cloud Deployment (Render)

### Prerequisites

1. Push your code to GitHub/GitLab
2. Have your backend API deployed and accessible

### Deployment Steps

1. **Create a New Web Service on Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your Git repository

2. **Configure the Service**
   - **Name**: `teacher-frontend` (or your preferred name)
   - **Region**: Select closest to your users
   - **Branch**: `main` or `master`
   - **Runtime**: **Docker**
   - **Instance Type**: Free or Starter

3. **Set Environment Variables**
   
   Add the following in the Render dashboard:
   
   | Key | Value | Example |
   |-----|-------|---------|
   | `VITE_API_BASE_URL` | Your backend API URL | `https://your-backend.onrender.com/rent-easy/api` |
   | `VITE_APP_TITLE` | Application title | `Student-Teacher Management System` |

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Wait for deployment to complete (2-5 minutes)

### Access Your Application

Your frontend will be available at:
```
https://your-service-name.onrender.com
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## 🎨 Customization

### Changing Theme Colors

Edit the theme configuration in `src/theme.js` (if exists) or the Material-UI theme provider.

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation menu if needed

### API Configuration

All API calls are centralized in `src/services/`. Update the base URL in `.env` to point to your backend.

## 🌐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | Yes | `http://localhost:8000/rent-easy/api` |
| `VITE_APP_TITLE` | Application title | No | `Student-Teacher Management System` |

**Note**: All environment variables must be prefixed with `VITE_` to be accessible in the application.

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>
```

### API Connection Issues

- Verify backend is running
- Check `VITE_API_BASE_URL` in `.env`
- Ensure CORS is enabled on backend
- Check browser console for errors

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist .vite
npm run build
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Related Projects

- [Teacher-BE](../Teacher-BE) - Backend API for this application

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using React, Vite, and Material-UI**
