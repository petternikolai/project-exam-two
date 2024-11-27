/**
 * AuthContext is a React Context used to manage authentication state globally
 * across the application. This provides an easy way to share data like user
 * information and authentication status without prop-drilling.
 *
 * @example
 * // Using AuthContext in a component
 * import { useContext } from 'react';
 * import AuthContext from './AuthContext';
 *
 * const MyComponent = () => {
 *   const { user, login, logout } = useContext(AuthContext);
 *   return <div>Welcome, {user.name}!</div>;
 * }
 *
 * @returns {React.Context} - A React Context object for authentication state.
 */
import { createContext } from "react";

// Create a new React Context for authentication
const AuthContext = createContext();

export default AuthContext;
