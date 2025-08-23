const BASE_URL = '/api';


async function apiRequest(endpoint, options = {}) {
  try {
    const url = `${BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // Merge headers properly
    if (options.headers) {
      finalOptions.headers = { ...defaultOptions.headers, ...options.headers };
    }
    
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
        return;
      }
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
}

// ============================================================================
//  Authentication Functions
// ============================================================================


 // Login user
 
export const login = async (credentials) => {
  const response = await apiRequest('/tokens', {
    method: 'POST',
    body: JSON.stringify({
      email: credentials.username, // Frontend sends username, backend expects email
      password: credentials.password
    })
  });
  
  return {
    token: response.token,
    userId: response.user?.id || response.userId
  };
};


 // Signup user

export const signup = async (userData) => {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify({
      username: userData.username,
      password: userData.password,
      name: userData.displayName || userData.username,
      avatarUrl: userData.avatarUrl
      // backend will compute email from username and ignore gender/birthday for now
    })
  });
};

// ============================================================================
//  User Functions
// ============================================================================

export const getUsers = async () => {
  return apiRequest('/users');
};

// ============================================================================
//  Mail Functions
// ============================================================================


 // Fetch all mails (inbox)

export const fetchMails = async () => {
  return apiRequest('/mails');
};


 // Send new mail
 
export const sendMail = async (mailData) => {
  return apiRequest('/mails', {
    method: 'POST',
    body: JSON.stringify(mailData)
  });
};


 // Get specific mail by ID

export const getMailById = async (mailId) => {
  return apiRequest(`/mails/${mailId}`);
};


 // Search mails

export const searchMails = async (query) => {
  return apiRequest(`/mails/search/${encodeURIComponent(query)}`);
};


 // Update mail (mark as read, important, etc.)

export const updateMail = async (mailId, updateData) => {
  return apiRequest(`/mails/${mailId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  });
};


// Delete mail
 
export const deleteMail = async (mailId) => {
  return apiRequest(`/mails/${mailId}`, {
    method: 'DELETE'
  });
};

// ============================================================================
//  Label Functions
// ============================================================================


 // Get all labels

export const getLabels = async () => {
  return apiRequest('/labels');
};


 // Create new label
 
export const createLabel = async (labelData) => {
  return apiRequest('/labels', {
    method: 'POST',
    body: JSON.stringify(labelData)
  });
};


// Update label

export const updateLabel = async (labelId, updateData) => {
  return apiRequest(`/labels/${labelId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  });
};


 // Delete label
 
export const deleteLabel = async (labelId) => {
  return apiRequest(`/labels/${labelId}`, {
    method: 'DELETE'
  });
};

// ============================================================================
//  Blacklist Functions
// ============================================================================


 // Add email to blacklist
 
export const addToBlacklist = async (blacklistData) => {
  return apiRequest('/blacklist', {
    method: 'POST',
    body: JSON.stringify(blacklistData)
  });
};


 // Remove email from blacklist
 
export const removeFromBlacklist = async (blacklistId) => {
  return apiRequest(`/blacklist/${blacklistId}`, {
    method: 'DELETE'
  });
};
