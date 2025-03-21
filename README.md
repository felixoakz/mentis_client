# Mentis - Personal Finance App 🌐💰

[**Mentis Live**](http://appmentis.ddns.net)

Mentis is a modern personal finance application designed to help you manage your accounts and track your transactions with ease. 

## Key Features

### 1. **Multiple Account Management**
- Create and manage multiple financial accounts with different balances and purposes.  
📊

### 2. **Transaction Tracking**
- Add, edit, and delete transactions with automatic balance updates and chronological organization.  
✏️

### 3. **User Authentication**
- Secure login and registration system with validation to protect your financial data.  
✅

### 4. **Customizable Themes**
- Choose from multiple themes to personalize your experience with the app.  
🎨

### 5. **Responsive Design**
- Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices.  
📱

### 6. **Real-time Balance Updates**
- Instantly see how transactions affect your account balances with real-time calculations.  
➕

---

## Technology Stack

### 1. **React**
- Frontend library for building the user interface with reusable components.  
⚛️

### 2. **React Router**
- Client-side routing for navigation between different views.  
🛣️

### 3. **DaisyUI**
- Component library for Tailwind CSS with theme support.  
🎨

### 4. **React Hook Form**
- Form validation and handling with minimal re-renders.  
📝

### 5. **Context API**
- State management for authentication and user data.  
📊

### 6. **RESTful API**
- Backend communication for data persistence and retrieval.  
🌐

---

## Implementation Challenges & Solutions

### 1. **Real-time Balance Updates**
- **Challenge**: Ensuring that account balances update immediately after transactions are added, edited, or deleted.
- **Solution**: Implemented a state management system using React Context and API response handling to update balances in real-time.

### 2. **Currency Handling**
- **Challenge**: Accurately handling currency values without floating-point precision issues.
- **Solution**: Used the Big.js library to handle currency calculations with precision. Stored amounts in cents (smallest unit) in the database.

### 3. **Form Validation**
- **Challenge**: Creating a robust validation system for user registration with complex password requirements.
- **Solution**: Leveraged React Hook Form's validation capabilities with custom regex patterns and validation functions.

### 4. **Theme Customization**
- **Challenge**: Implementing a theme system that persists user preferences and applies them consistently.
- **Solution**: Used localStorage to persist theme preferences and React's useEffect to apply the theme on component mount.

---

## Ready to Take Control of Your Finances?

Start tracking your accounts and transactions today with Mentis.

[Get Started](#)
