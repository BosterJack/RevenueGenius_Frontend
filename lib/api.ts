import { Business } from "@/types/businesse"
import axiosClient from "./axios-client"
import type { AuthResponse } from "@/types/api"

// Service d'authentification
export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await axiosClient.post("/api/login/", { email, password })
    return response.data
  },

  register: async (userData: any): Promise<any> => {
    const response = await axiosClient.post("/api/register/", userData)
    return response.data
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await axiosClient.post("/api/token/refresh/", { refresh: refreshToken })
    return response.data
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await axiosClient.get("/api/users/me/")
    return response.data
  },
 getNotifications: async (): Promise<any> => {
    const response = await axiosClient.get("/api/notifications/")
    return response.data
  },

  markAllNotificationsAsRead: async (notifData: any): Promise<any> => {
    const response = await axiosClient.post("/api/notifications/mark_all_as_read/", notifData)
    return response.data
  },
markOneNotificationAsRead: async (notifData: any, notificationId: string): Promise<any> => {
  const response = await axiosClient.post(`/api/notifications/${notificationId}/mark_as_read/`, notifData)
  return response.data
},
  updateProfile: async (profileData: any): Promise<any> => {
  const response = await axiosClient.put("/api/users/update_profile/", profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
},

}

// Service pour les entreprises


// Service pour les abonnements
export const subscriptionService = {
  getSubscriptions: async (): Promise<any> => {
    const response = await axiosClient.get("/api/subscriptions/")
    return response.data
  },
}

// Service pour les données de revenus
export const revenueService = {
  addRevenueData: async (revenueData: any): Promise<any> => {
    const response = await axiosClient.post("/api/revenue-data/", revenueData)
    return response.data
  },

  getRevenueData: async (): Promise<any> => {
    const response = await axiosClient.get(`/api/revenue-data/`)
    return response.data
  },

    updateRevenue: async (revenueId: string, revenueData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/revenue-data/${revenueId}/`, revenueData)
    return response.data
  },

  deleteRevenue: async (revenueId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/revenue-data/${revenueId}/`)
    return response.data
  },

}



export const planService = {
  addPlanData: async (plansData: any): Promise<any> => {
    const response = await axiosClient.post("/api/plans/", plansData)
    return response.data
  },

  getPlanData: async (): Promise<any> => {
    const response = await axiosClient.get(`/api/plans/`)
    return response.data
  },

    updatePlan: async (planId: string, planData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/plans/${planId}/`, planData)
    return response.data
  },

  deletePlan: async (planId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/plans/${planId}/`)
    return response.data
  },

}



// export const subscriptionService = {
//   addPlanData: async (plansData: any): Promise<any> => {
//     const response = await axiosClient.post("/api/plans/", plansData)
//     return response.data
//   },

//   getPlanData: async (): Promise<any> => {
//     const response = await axiosClient.get(`/api/plans/`)
//     return response.data
//   },

//     updatePlan: async (planId: string, planData: any): Promise<any> => {
//     const response = await axiosClient.put(`/api/plans/${planId}/`, planData)
//     return response.data
//   },

//   deletePlan: async (planId: string): Promise<any> => {
//     const response = await axiosClient.delete(`/api/plans/${planId}/`)
//     return response.data
//   },

// }
// Service pour les prévisions
export const forecastService = {
  generateForecast: async (months: number, scenario: string): Promise<any> => {
    const response = await axiosClient.post("/api/forecasts/generate/", { months, scenario })
    return response.data
  },

  getForecasts: async (): Promise<any> => {
    const response = await axiosClient.get("/api/forecasts/")
    return response.data
  },

  createAdvancedForecast: async (forecastData: any): Promise<any> => {
    const response = await axiosClient.post("/api/forecasts/create_advanced_forecast/", forecastData)
    return response.data
  },

  calculateBreakEven: async (breakEvenData: any): Promise<any> => {
    const response = await axiosClient.post("/api/break-even/calculate/", breakEvenData)
    return response.data
  },
 addBreakEven: async (breakEvenData: any): Promise<any> => {
    const response = await axiosClient.post("/api/break-even/", breakEvenData)
    return response.data
  },
  createWhatIfScenario: async (scenarioData: any): Promise<any> => {
    const response = await axiosClient.post("/api/forecasts/what_if_scenario/", scenarioData)
    return response.data
  },

   deleteForecast: async (forecastId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/forecasts/${forecastId}/`)
    return response.data
  },

  updateBreakEven: async (breakEvenId: string, breakEvenData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/break-even/${breakEvenId}/`, breakEvenData)
    return response.data
  },

  updateForecast: async (forecastId: string, forecastData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/forecasts/${forecastId}/`, forecastData)
    return response.data
  },
}
export const breakEvenService = {
  getBreakEven: async (): Promise<any> => {
    const response = await axiosClient.get("/api/break-even/")
    return response.data
  },
  calculateBreakEven: async (breakEvenData: any): Promise<any> => {
    const response = await axiosClient.post("/api/break-even/calculate/", breakEvenData)
    return response.data
  },
 addBreakEven: async (breakEvenData: any): Promise<any> => {
    const response = await axiosClient.post("/api/break-even/", breakEvenData)
    return response.data
  },
 
   deleteBreakEven: async (breakId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/break-even/${breakId}/`)
    return response.data
  },

  updateBreakEven: async (breakEvenId: string, breakEvenData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/break-even/${breakEvenId}/`, breakEvenData)
    return response.data
  },
}
// Service pour les leads
export const leadService = {
  createLead: async (leadData: any): Promise<any> => {
    const response = await axiosClient.post("/api/leads/", leadData)
    return response.data
  },

  getLeads: async (filters?: Record<string, string>): Promise<any> => {
    let url = "/api/leads/"

    if (filters) {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`
      }
    }

    const response = await axiosClient.get(url)
    return response.data
  },

  updateLead: async (leadId: string, leadData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/leads/${leadId}/`, leadData)
    return response.data
  },

  deleteLead: async (leadId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/leads/${leadId}/`)
    return response.data
  },

  addLeadInteraction: async (leadId: string, interactionData: any): Promise<any> => {
    const response = await axiosClient.post(`/api/leads/${leadId}/interactions/`, interactionData)
    return response.data
  },

  getLeadAnalytics: async (): Promise<any> => {
    const response = await axiosClient.get("/api/leads/analytics/")
    return response.data
  },
  getLeadInterractions: async (leadId: string): Promise<any> => {
    const response = await axiosClient.get(`/api/leads/${leadId}/interactions/`)
    return response.data
  },

   updateLeadInterractions: async (leadId: string,interactionId: string, leadData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/leads/${leadId}/interactions/${interactionId}/`, leadData)
    return response.data
  },

   deleteLeadInterractions: async (leadId: string,interactionId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/leads/${leadId}/interactions/${interactionId}/`)
    return response.data
  },
  getLeadInsights: async (): Promise<any> => {
    const response = await axiosClient.get("/api/leads/insights/")
    return response.data
  },

  getLTVCACAnalysis: async (): Promise<any> => {
    const response = await axiosClient.get("/api/leads/ltv_cac_analysis/")
    return response.data
  },

  getAdvancedSegmentation: async (): Promise<any> => {
    const response = await axiosClient.get("/api/leads/advanced_segmentation/")
    return response.data
  },
}

// Service pour le contenu
export const contentService = {
  createContent: async (contentData: any): Promise<any> => {
    const response = await axiosClient.post("/api/content/", contentData)
    return response.data
  },

  getContent: async (type?: string): Promise<any> => {
    let url = "/api/content/"

    if (type) {
      url += `?type=${type}`
    }

    const response = await axiosClient.get(url)
    return response.data
  },

  updateContent: async (contentId: string, contentData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/content/${contentId}/`, contentData)
    return response.data
  },

  deleteContent: async (contentId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/content/${contentId}/`)
    return response.data
  },

  createContentPerformance: async (contentData: any, contentId: string): Promise<any> => {
    const response = await axiosClient.post(`/api/content/${contentId}/performance/`, contentData)
    return response.data
  },

  updateContentPerformance: async (contentId: string, performanceData: any,performanceId: string): Promise<any> => {
    const response = await axiosClient.put(`/api/content/${contentId}/performance/${performanceId}/`, performanceData)
    return response.data
  },

  getROIByType: async (): Promise<any> => {
    const response = await axiosClient.get("/api/content/roi_by_type/")
    return response.data
  },

  getMonthlyTrends: async (): Promise<any> => {
    const response = await axiosClient.get("/api/content/monthly_trends/")
    return response.data
  },

  getContentPerformances: async (filters?: Record<string, string>): Promise<any> => {
    let url = "/api/content/performances/"

    if (filters) {
      const queryParams = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })

      if (queryParams.toString()) {
        url += `?${queryParams.toString()}`
      }
    }

    const response = await axiosClient.get(url)
    return response.data
  },

  getContentInsights: async (): Promise<any> => {
    const response = await axiosClient.get("/api/content/insights/")
    return response.data
  },

   deleteContentPerformance: async (contentId: string,performanceId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/content/${contentId}/performance/${performanceId}/`)
    return response.data
  },
}

// Service pour les objectifs
export const goalService = {
  createGoal: async (goalData: any): Promise<any> => {
    const response = await axiosClient.post("/api/goals/", goalData)
    return response.data
  },

  getGoals: async (): Promise<any> => {
    const response = await axiosClient.get("/api/goals/")
    return response.data
  },

  getActiveGoals: async (): Promise<any> => {
    const response = await axiosClient.get("/api/goals/active/")
    return response.data
  },

  updateGoal: async (goalId: string, goalData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/goals/${goalId}/`, goalData)
    return response.data
  },
 deleteGoal: async (goalId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/goals/${goalId}/`)
    return response.data
  },
  markGoalCompleted: async (goalId: string): Promise<any> => {
    const response = await axiosClient.post(`/api/goals/${goalId}/mark_completed/`)
    return response.data
  },

  createMilestone: async (goalId: string, milestoneData: any): Promise<any> => {
    const response = await axiosClient.post(`/api/goals/${goalId}/milestones/`, milestoneData)
    return response.data
  },

  updateMilestone: async (goalId: string, milestoneId: string, milestoneData: any): Promise<any> => {
    const response = await axiosClient.put(`/api/goals/${goalId}/milestones/${milestoneId}/`, milestoneData)
    return response.data
  },

  markMilestoneCompleted: async (goalId: string, milestoneId: string): Promise<any> => {
    const response = await axiosClient.post(`/api/goals/${goalId}/milestones/${milestoneId}/mark_completed/`)
    return response.data
  },
   deleteGoalMilestone: async (goalId: string,milestoneId: string): Promise<any> => {
    const response = await axiosClient.delete(`/api/goals/${goalId}/milestones/${milestoneId}/`)
    return response.data
  },
  getGoalMilestone: async (goalId: string): Promise<any> => {
    const response = await axiosClient.get(`/api/goals/${goalId}/milestones/`)
    return response.data
  },
}

// Service pour les notifications
export const notificationService = {
  getNotifications: async (): Promise<any> => {
    const response = await axiosClient.get("/api/notifications/")
    return response.data
  },

  getUnreadNotifications: async (): Promise<any> => {
    const response = await axiosClient.get("/api/notifications/unread/")
    return response.data
  },

  markNotificationAsRead: async (notificationId: string): Promise<any> => {
    const response = await axiosClient.post(`/api/notifications/${notificationId}/mark_as_read/`)
    return response.data
  },

  markAllNotificationsAsRead: async (): Promise<any> => {
    const response = await axiosClient.post("/api/notifications/mark_all_as_read/")
    return response.data
  },
}

export const businessService = {
  getBusinesses: async (): Promise<{ results: Business[] }> => {
    const response = await axiosClient.get("/api/businesses/")
    return response.data
  },

  getBusiness: async (id: string): Promise<Business> => {
    const response = await axiosClient.get(`/api/businesses/${id}/`)
    return response.data
  },

  createBusiness: async (businessData: Partial<Business>): Promise<Business> => {
    const response = await axiosClient.post("/api/businesses/", businessData)
    return response.data
  },

  updateBusiness: async (id: string, businessData: Partial<Business>): Promise<Business> => {
    const response = await axiosClient.put(`/api/businesses/${id}/`, businessData)
    return response.data
  },

  deleteBusiness: async (id: string): Promise<void> => {
    await axiosClient.delete(`/api/businesses/${id}/`)
  },

  setActiveBusinesses: async (id: string): Promise<void> => {
    await axiosClient.post(`/api/businesses/${id}/set_active/`)
  },
}




