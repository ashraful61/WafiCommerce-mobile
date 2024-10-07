import axios from "axios";
import * as authService from "./auth-service"; // For token retrieval and refresh

const apiClient = axios.create({
  baseURL: "https://dev-api.waficommerce.com", // Replace with your base URL
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Retrieve the access token from storage
    const accessToken = await authService.getAccessToken();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = await authService.getRefreshToken();
        const newTokens = await authService.refreshToken(refreshToken);

        // Store the new tokens
        await authService.storeToken(
          newTokens.access_token,
          newTokens.refresh_token
        );

        // Retry the original request with the new token
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newTokens.access_token}`;
        return apiClient(originalRequest);
      } catch (err) {
        // Handle token refresh failure (e.g., log out the user)
        console.error("Token refresh failed:", err);
        await authService.logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
