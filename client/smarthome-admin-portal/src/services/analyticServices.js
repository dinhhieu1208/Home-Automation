import api from "./api"; 

const AnalyticsService = {
  getAnalytics: async () => {
    try {
      const response = await api.get("/analytics");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      throw error;
    }
  },
};

export default AnalyticsService;
