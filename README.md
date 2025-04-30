# Restaurant Web App - Restaurant Management System

Restaurant Web App is a comprehensive restaurant management system designed to streamline operations for restaurant owners and provide a seamless experience for customers. This full-stack application handles menu management, online ordering, table bookings, and more.

## 🚀 Features

### Customer Portal
- **Menu Browsing**: View all food items with categories, descriptions, and prices
- **User Authentication**: Register, login, and maintain user profiles
- **Cart Management**: Add/remove items, view cart, and proceed to checkout
- **Online Ordering**: Place orders for delivery or dine-in

### Admin Dashboard
- **Menu Management**: Add, edit, and remove menu items
- **Order Tracking**: View and update order status

## 🛠️ Tech Stack

### Frontend
- **React.js**: UI building
- **React Router**: Navigation
- **Redux**: State management
- **TailwindCSS**: Styling

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **Multer**: File uploads
- **Cloudinary**: Image storage

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/mohammadsarfarazafzal/restaurant-web-app.git
   cd restaurant-web-app
   ```

2. Install backend dependencies
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_EXPIRY=10d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server
   ```bash
   npm run dev
   ```

### Admin Dashboard Setup
1. Install admin dashboard dependencies
   ```bash
   cd backend/admin
   npm install
   ```

2. Start the admin dashboard
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend application
   ```bash
   npm run dev
   ```

## 📝 API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user

### Menu Routes
- `GET /api/menu/list` - Get all menu items
- `POST /api/menu/add` - Add a new menu item (admin)
- `POST /api/menu/remove` - Remove a menu item (admin)

### Cart Routes
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `GET /api/cart/all` - Get all cart items

### Order Routes
- Coming soon

## 🚧 Under Development

This project is still in active development. Upcoming features include:

- Payment integration
- User profile management
- Enhanced admin analytics
- Order tracking for customers
- Email notifications for orders and reservations

## 👥 Contributors

- [Nishant Kumar Bhadani](https://github.com/NishantkumarBhadani)
- [Md Sarfaraz Afzal](https://github.com/mohammadsarfarazafzal)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
