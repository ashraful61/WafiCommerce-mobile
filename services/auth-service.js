import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_URL = "https://dev-api.waficommerce.com/connect/token";

// to Login and retrieve access & refresh tokens
export const login = async (username, password, tenant) => {
  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        __tenant: tenant,
      },
      body: new URLSearchParams({
        grant_type: "password",
        username: username,
        password: password,
        client_id: "WafiCommerce_App",
        scope: "WafiCommerce offline_access",
      }).toString(),
    });

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem("accessToken", data.access_token);
      await AsyncStorage.setItem("refreshToken", data.refresh_token);

      console.log("Tokens saved successfully!");
      return data;
    } else {
      console.error("Failed to login:", data.error_description);
      throw new Error(data.error_description);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// to retrieve access token from storage
export const getAccessToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

// to retrieve refresh token from storage
export const getRefreshToken = async () => {
  return await AsyncStorage.getItem("refreshToken");
};

// Refresh access token using refresh token
export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: "WafiCommerce_App",
        scope: "WafiCommerce offline_access",
      }).toString(),
    });

    const data = await response.json();

    if (response.ok) {
      // Store new tokens
      await AsyncStorage.setItem("accessToken", data.access_token);
      await AsyncStorage.setItem("refreshToken", data.refresh_token);

      console.log("Tokens refreshed successfully!");
      return data;
    } else {
      console.error("Failed to refresh token:", data.error_description);
      throw new Error(data.error_description);
    }
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

// Logout and remove tokens from storage
export const logout = async () => {
  try {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");

    console.log("Logged out and tokens removed.");
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
