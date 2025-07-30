const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'shop-bff/1.0.0'
};

const buildHeaders = (customHeaders = {}) => {
  return { ...DEFAULT_HEADERS, ...customHeaders };
};


const makeRequest = async (baseUrl, endpoint, options = {}) => {
  const {
    method = 'GET',
    body = null,
    headers = {},
    ...requestOptions
  } = options;

  const url = `${baseUrl}${endpoint}`;
  const requestConfig = {
    method,
    headers: buildHeaders(headers),
    ...requestOptions
  };

  // Add body for POST, PUT, PATCH requests
  if (body && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
    requestConfig.body = typeof body === 'string' ? body : JSON.stringify(body);
  }
    // Log the request details
    console.log(`[HTTP] ${method.toUpperCase()} ${url}`, {
        headers: requestConfig.headers,
        body: requestConfig.body,
        ...requestOptions
    });
  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  // Handle empty responses
  if (response.status === 204) {
    return null;
  }

  return await response.json();
};

/**
 * Create HTTP client functions for a specific service
 */
const createHttpClient = (baseUrl) => {
  return {
    // GET request
    get: (endpoint, options = {}) => 
      makeRequest(baseUrl, endpoint, { ...options, method: 'GET' }),

    // POST request  
    post: (endpoint, body = null, options = {}) =>
      makeRequest(baseUrl, endpoint, { ...options, method: 'POST', body }),

    // PUT request
    put: (endpoint, body = null, options = {}) =>
      makeRequest(baseUrl, endpoint, { ...options, method: 'PUT', body }),

    // PATCH request
    patch: (endpoint, body = null, options = {}) =>
      makeRequest(baseUrl, endpoint, { ...options, method: 'PATCH', body }),

    // DELETE request
    delete: (endpoint, options = {}) =>
      makeRequest(baseUrl, endpoint, { ...options, method: 'DELETE' }),
  };
};

module.exports = {
  createHttpClient,
};
