import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Health Records API
export const healthAPI = {
  // Get all health records
  getRecords: async (userId: string) => {
    try {
      const response = await apiClient.get('/api/health/records', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  },

  // Get records by type
  getRecordsByType: async (userId: string, type: string) => {
    try {
      const response = await apiClient.get('/api/health/records/type', {
        params: { userId, type }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching records by type:', error);
      throw error;
    }
  },

  // Upload medical record
  uploadRecord: async (userId: string, file: File, metadata: any = {}) => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('file', file);
      if (metadata.title) formData.append('title', metadata.title);
      if (metadata.type) formData.append('type', metadata.type);

      const response = await apiClient.post('/api/health/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading record:', error);
      throw error;
    }
  },

  // Get lab results
  getLabResults: async (userId: string) => {
    try {
      const response = await apiClient.get('/api/health/labs', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching lab results:', error);
      throw error;
    }
  },

  // Get vitals history
  getVitalsHistory: async (userId: string, metricType: string, days: number = 7) => {
    try {
      const response = await apiClient.get('/api/health/vitals', {
        params: { userId, metricType, days }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching vitals history:', error);
      throw error;
    }
  },

  // Process health data
  processHealthData: async (userId: string, data: any) => {
    try {
      const response = await apiClient.post('/api/health/process', {
        userId,
        data
      });
      return response.data;
    } catch (error) {
      console.error('Error processing data:', error);
      throw error;
    }
  },

  // Sync devices
  syncDevices: async (userId: string) => {
    try {
      const response = await apiClient.post('/api/health/sync', {
        userId
      });
      return response.data;
    } catch (error) {
      console.error('Error syncing devices:', error);
      throw error;
    }
  }
};

// Copilot Chat API
export const copilotAPI = {
  // Send chat message
  sendMessage: async (userId: string, message: string, context?: any) => {
    try {
      const response = await apiClient.post('/api/chat/send', {
        userId,
        message,
        context
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get chat history
  getHistory: async (userId: string, limit: number = 50) => {
    try {
      const response = await apiClient.get('/api/chat/history', {
        params: { userId, limit }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },

  // Get copilot suggestions
  getSuggestions: async () => {
    try {
      const response = await apiClient.get('/api/chat/suggestions');
      return response.data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      throw error;
    }
  },

  // Process health data query
  processQuery: async (userId: string, query: string) => {
    try {
      const response = await apiClient.post('/api/chat/process', {
        userId,
        query
      });
      return response.data;
    } catch (error) {
      console.error('Error processing query:', error);
      throw error;
    }
  }
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: async (userId: string) => {
    try {
      const response = await apiClient.get('/api/user/profile', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userId: string, data: any) => {
    try {
      const response = await apiClient.put('/api/user/profile', {
        userId,
        ...data
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Get user notifications
  getNotifications: async (userId: string) => {
    try {
      const response = await apiClient.get('/api/user/notifications', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    try {
      const response = await apiClient.post('/api/user/notifications/read', {
        notificationId
      });
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
};

export default apiClient;
