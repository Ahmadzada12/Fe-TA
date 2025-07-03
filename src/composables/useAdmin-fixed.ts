import { ref } from "vue";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3001/v1";

// Connection status
const isServerConnected = ref(true);
const lastConnectionCheck = ref<Date | null>(null);

// Check server connection
const checkServerConnection = async () => {
  try {
    await axios.get(`${API_BASE_URL.replace('/v1', '')}/health`, {
      timeout: 5000
    });
    isServerConnected.value = true;
    lastConnectionCheck.value = new Date();
    return true;
  } catch (error) {
    isServerConnected.value = false;
    lastConnectionCheck.value = new Date();
    console.warn("⚠️ Backend server is not responding");
    return false;
  }
};

export const useAdmin = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Reactive state
  const news = ref<any[]>([]);
  const categories = ref<any[]>([]);
  const donations = ref<any[]>([]);
  const users = ref<any[]>([]);

  // Auth helpers
  const getAuthHeaders = (isFormData = false) => {
    const token = localStorage.getItem("token");
    const headers: any = {
      Authorization: `Bearer ${token}`,
    };

    // Only set Content-Type for non-FormData requests
    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return headers;
  };

  const checkAdminRole = () => {
    const userRole = localStorage.getItem("userRole");
    return userRole === "Admin" || userRole === "admin";
  };

  // Generic API call
  const apiCall = async (method: string, endpoint: string, data?: any) => {
    if (!checkAdminRole()) {
      throw new Error("Access denied: Admin role required");
    }

    loading.value = true;
    error.value = null;

    try {
      // Check connection before making API call (optional, every 30 seconds)
      const shouldCheckConnection = !lastConnectionCheck.value || 
        (Date.now() - lastConnectionCheck.value.getTime()) > 30000;
      
      if (shouldCheckConnection) {
        await checkServerConnection();
      }

      // Detect if data is FormData
      const isFormData = data instanceof FormData;

      const config = {
        method,
        url: `${API_BASE_URL}${endpoint}`,
        headers: getAuthHeaders(isFormData),
        ...(data && { data }),
      };

      console.log("API Call config:", {
        method,
        endpoint,
        isFormData,
        headers: config.headers,
        dataType: data?.constructor?.name,
      });

      const response = await axios(config);
      return response.data;
    } catch (err: any) {
      // Enhanced error handling for different error types
      let errorMessage = "An error occurred";
      let isConnectionError = false;
      
      if (err.code === 'ERR_NETWORK' || err.code === 'ERR_CONNECTION_REFUSED') {
        errorMessage = "Backend server tidak dapat diakses. Pastikan server berjalan di http://localhost:3001";
        isConnectionError = true;
      } else if (err.response?.status === 404) {
        errorMessage = "API endpoint not found";
      } else if (err.response?.status === 401) {
        errorMessage = "Authentication required";
      } else if (err.response?.status === 403) {
        errorMessage = "Access denied";
      } else if (err.response?.status >= 500) {
        errorMessage = "Server error occurred";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      console.error("API Call Error:", {
        endpoint,
        error: err.response?.data || err.message,
        status: err.response?.status,
        code: err.code,
        isConnectionError,
        message: errorMessage,
      });

      error.value = errorMessage;
      
      // If it's a connection error, show user-friendly message
      if (isConnectionError) {
        console.warn("🔌 Backend Connection Issue - Please check if backend server is running");
      }
      
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // News API methods
  const getNews = async (params?: any) => {
    try {
      const queryString = params ? new URLSearchParams(params).toString() : '';
      const endpoint = queryString ? `/news?${queryString}` : '/news';
      
      const response = await apiCall("GET", endpoint);
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data.data)) {
        // Paginated response format
        news.value = response.data.data;
      } else if (Array.isArray(response.data)) {
        // Direct array response format
        news.value = response.data;
      } else if (Array.isArray(response)) {
        // Raw array response
        news.value = response;
      } else {
        console.warn("Unexpected response format:", response);
        news.value = [];
      }
      
      return response;
    } catch (err) {
      console.error("Error fetching news:", err);
      news.value = [];
      throw err;
    }
  };

  const createNews = async (newsData: any) => {
    return await apiCall("POST", "/news", newsData);
  };

  const updateNews = async (id: string, newsData: any) => {
    return await apiCall("PUT", `/news/${id}`, newsData);
  };

  const deleteNews = async (id: string) => {
    return await apiCall("DELETE", `/news/${id}`);
  };

  // Categories API methods
  const getCategories = async () => {
    try {
      const response = await apiCall("GET", "/category");
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        categories.value = response.data;
      } else if (Array.isArray(response)) {
        categories.value = response;
      } else {
        console.warn("Unexpected categories response format:", response);
        categories.value = [];
      }
      
      return response;
    } catch (err) {
      console.error("Error fetching categories:", err);
      categories.value = [];
      throw err;
    }
  };

  const createCategory = async (categoryData: any) => {
    return await apiCall("POST", "/category", categoryData);
  };

  const updateCategory = async (id: string, categoryData: any) => {
    return await apiCall("PUT", `/category/${id}`, categoryData);
  };

  const deleteCategory = async (id: string) => {
    return await apiCall("DELETE", `/category/${id}`);
  };

  // Donations/Crowdfunding API methods
  const getDonations = async () => {
    try {
      const response = await apiCall("GET", "/crowdfounding");
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        donations.value = response.data;
      } else if (Array.isArray(response)) {
        donations.value = response;
      } else {
        console.warn("Unexpected donations response format:", response);
        donations.value = [];
      }
      
      return response;
    } catch (err) {
      console.error("Error fetching donations:", err);
      donations.value = [];
      throw err;
    }
  };

  const createDonation = async (donationData: any) => {
    return await apiCall("POST", "/crowdfounding", donationData);
  };

  const updateDonation = async (id: string, donationData: any) => {
    return await apiCall("PUT", `/crowdfounding/${id}`, donationData);
  };

  const deleteDonation = async (id: string) => {
    return await apiCall("DELETE", `/crowdfounding/${id}`);
  };

  // Users API methods
  const getUsers = async () => {
    try {
      const response = await apiCall("GET", "/users");
      
      // Handle different response formats
      if (response.data && Array.isArray(response.data)) {
        users.value = response.data;
      } else if (Array.isArray(response)) {
        users.value = response;
      } else {
        console.warn("Unexpected users response format:", response);
        users.value = [];
      }
      
      return response;
    } catch (err) {
      console.error("Error fetching users:", err);
      users.value = [];
      throw err;
    }
  };

  const updateUser = async (id: string, userData: any) => {
    return await apiCall("PUT", `/users/${id}`, userData);
  };

  const deleteUser = async (id: string) => {
    return await apiCall("DELETE", `/users/${id}`);
  };

  // Dashboard API methods
  const getDashboardStats = async () => {
    return await apiCall("GET", "/Dashboard/get");
  };

  // Return all methods and state
  return {
    // State
    loading,
    error,
    news,
    categories,
    donations,
    users,
    
    // Connection utilities
    isServerConnected,
    checkServerConnection,
    
    // News methods
    getNews,
    createNews,
    updateNews,
    deleteNews,
    
    // Categories methods
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    
    // Donations methods
    getDonations,
    createDonation,
    updateDonation,
    deleteDonation,
    
    // Users methods
    getUsers,
    updateUser,
    deleteUser,
    
    // Dashboard methods
    getDashboardStats,
    
    // Utility methods
    checkAdminRole,
  };
};
