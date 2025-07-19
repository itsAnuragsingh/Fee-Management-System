// Token management utility for authentication

export const getAuthToken = () => {
  // First try to get from localStorage as backup
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Enhanced fetch wrapper that includes authentication headers
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  const defaultOptions = {
    credentials: 'include', // Always include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add Authorization header if token exists
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, { ...defaultOptions, ...options });
};

// Login function that stores token from response
export const loginWithTokenStorage = async (credentials) => {
  const response = await fetch("https://fee-management-system-52mr.onrender.com/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  
  if (response.ok) {
    // Try to extract token from response if available (for future enhancement)
    if (data.token) {
      setAuthToken(data.token);
    }
  }
  
  return { response, data };
};

// Logout function that clears stored token
export const logoutWithTokenCleanup = async () => {
  const response = await fetch("https://fee-management-system-52mr.onrender.com/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  // Clear stored token regardless of response
  removeAuthToken();
  
  return response;
};
