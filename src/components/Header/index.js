export { default } from "./MainHeader";

// Add this import at the top of your existing Header component
import { Link } from 'react-router-dom'; // If using React Router

// Example of how to add a Login button to your existing header
// Add this button to your header's navigation section:

<nav className="header-nav">
  {/* Your existing nav items */}
  
  <Link to="/login" className="login-btn">
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '6px' }}
    >
      <path 
        d="M10 10c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" 
        fill="currentColor"
      />
    </svg>
    Login
  </Link>
</nav>

// CSS for the login button (add to your header CSS file):
/*
.login-btn {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
*/