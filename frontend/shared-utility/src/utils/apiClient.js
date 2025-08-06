import { store } from '../stores/store';

const DEFAULT_BASE_URL = 'http://localhost:3000/api';

const getAuthToken = () => {
  const state = store.getState();
  if (state.auth?.token) {
    return state.auth.token;
  }
  
  return localStorage.getItem('token');
};

const getAuthHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders
  };
  
  // Add Authorization header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

const authenticatedFetch = async (url, options = {}) => {
  const authHeaders = getAuthHeaders(options.headers);
  
  const config = {
    ...options,
    headers: authHeaders
  };
  
  return fetch(url, config);
};


const createApiClient = () => {
  
  const get = async (endpoint, options = {}) => {
    try {
      const response = await authenticatedFetch(`${DEFAULT_BASE_URL}${endpoint}`, {
        method: 'GET',
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`GET ${endpoint} failed: ${response.status} ${response.statusText}`);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error(`API GET Error (${endpoint}):`, error);
      throw error;
    }
  };

  const post = async (endpoint, data = null, options = {}) => {
    try {
      const response = await authenticatedFetch(`${DEFAULT_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: data ? JSON.stringify(data) : null,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`POST ${endpoint} failed: ${response.status} ${response.statusText}`);
      }
      
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      console.error(`API POST Error (${endpoint}):`, error);
      throw error;
    }
  };
  
  const put = async (endpoint, data = null, options = {}) => {
    try {
      const response = await authenticatedFetch(`${DEFAULT_BASE_URL}${endpoint}`, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : null,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`PUT ${endpoint} failed: ${response.status} ${response.statusText}`);
      }
      
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      console.error(`API PUT Error (${endpoint}):`, error);
      throw error;
    }
  };
  
  const patch = async (endpoint, data = null, options = {}) => {
    try {
      const response = await authenticatedFetch(`${DEFAULT_BASE_URL}${endpoint}`, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : null,
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`PATCH ${endpoint} failed: ${response.status} ${response.statusText}`);
      }
      
      const jsonResponse = await response.json();
      return jsonResponse.data;
    } catch (error) {
      console.error(`API PATCH Error (${endpoint}):`, error);
      throw error;
    }
  };
  
  const del = async (endpoint, options = {}) => {
    try {
      const response = await authenticatedFetch(`${DEFAULT_BASE_URL}${endpoint}`, {
        method: 'DELETE',
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`DELETE ${endpoint} failed: ${response.status} ${response.statusText}`);
      }
      
      // Some DELETE requests might not return JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return { success: true };
    } catch (error) {
      console.error(`API DELETE Error (${endpoint}):`, error);
      throw error;
    }
  };
  
  return {
    get,
    post,
    put,
    patch,
    delete: del,
  };
};

// Create default client instance
const apiClient = createApiClient();
export default apiClient;
