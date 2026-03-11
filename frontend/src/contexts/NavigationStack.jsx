import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A basic DSA-optimized Stack implementation for navigation history
 * LIFO principle: Last In, First Out
 */
class Stack {
  constructor() {
    this.items = [];
  }

  // Add an item to the top of the stack
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top item
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // View the top item without removing it
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get current size
  size() {
    return this.items.length;
  }
  
  // Clear the stack
  clear() {
    this.items = [];
  }

  // Get as array for debugging/rendering
  toArray() {
    return [...this.items];
  }
  
  // Check if stack contains a route
  contains(route) {
    return this.items.includes(route);
  }
}

const NavigationContext = createContext(null);

export const NavigationProvider = ({ children }) => {
  const stackRef = useRef(new Stack());
  const location = useLocation();
  const navigate = useNavigate();
  const [canGoBack, setCanGoBack] = useState(false);
  const isNavigatingBack = useRef(false);

  useEffect(() => {
    // If we're executing a 'goBack()' action, don't push the current route 
    // to the stack because it's already in the past, we are just popping.
    if (isNavigatingBack.current) {
      isNavigatingBack.current = false;
    } else {
      // Avoid pushing the exact same route consecutively
      if (stackRef.current.peek() !== location.pathname) {
        stackRef.current.push(location.pathname);
      }
    }
    
    // Update the state so UI can react (e.g. show/hide back button)
    // The stack size needs to be > 1 to have something to go back to 
    // (since the current page is at the top of the stack)
    setCanGoBack(stackRef.current.size() > 1);
    
  }, [location.pathname]);

  const goBack = () => {
    if (stackRef.current.size() > 1) {
      // Pop current page
      stackRef.current.pop();
      // Peek at previous page
      const previousRoute = stackRef.current.peek();
      
      if (previousRoute) {
        // Flag to prevent pushing this route back onto the stack in useEffect
        isNavigatingBack.current = true;
        navigate(previousRoute, { replace: true });
      }
    } else {
      // Fallback if stack is empty (e.g., deep link or refresh)
      navigate('/', { replace: true });
    }
  };

  const clearHistory = () => {
    stackRef.current.clear();
    stackRef.current.push(location.pathname);
    setCanGoBack(false);
  };

  return (
    <NavigationContext.Provider value={{ 
      goBack, 
      canGoBack, 
      clearHistory,
      history: stackRef.current.toArray()
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavStack = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavStack must be used within a NavigationProvider');
  }
  return context;
};
