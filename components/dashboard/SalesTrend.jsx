import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const SalesTrend = () => {
  const [saleAmount, setSaleAmount] = useState(null);
  const [error, setError] = useState(null);

  const bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTVmOGEtYjAxOS0yZTQwLTE5NmEtM2Y0ZTVlZTkwYmUyIiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU1ZjhhLWIwM2QtNGM2My04OGE5LTI2Zjg1M2E1ZTcwMiIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiODZkZWEwYTktN2VkYy00NDY1LWEwMDYtNmZiZjhjYzEwOGM0IiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3ODc4NDQ4LCJpYXQiOjE3Mjc4NzQ4NDh9.EhAikjmBHIQ1Dv5P7s6PzzzUCp81hRUkp29AUwXw2s5CiGzgvqtp7MRDCOd9Pu8zFWpsP96GqOtjrHxRCytlcZATTC5vRb7P9ghRwhvuSaC4cXhQiGc6DvV5YAoB1Kw1hjyGpLvplWrcWbYXFmKa_i0286A6vG3J6N85ZEd8cv6CAEeUKF7BtnLJ_0eBnONd2aFDQsBXpABzzPsTTIuDI8lmZN-sZZvVsrLVHc7lFjF1KftAlEn3JFsMiq05AZQvzJs3LATa_1-rs8DKcLUJ0MbXBk6Z_nwlNGwFijfDjysHAprFGMCh1IkzrlZs3tkcYmti8Mt_PTRjz7WVPZZQdw";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-api.waficommerce.com/api/app/my-sale/sales-trend-list",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({
              timeRange: 2,
            }),
          }
        );

        // Check the response status
        if (!response.ok) {
          const errorText = await response.text(); // Capture the HTML or text response
          throw new Error(
            `Request failed with status: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        setSaleAmount(data);
        console.log(saleAmount);
      } catch (error) {
        console.error("Error fetching data:", error.message); // Capture error message
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  if (error) return <Text>Error: {error}</Text>;
  if (!saleAmount) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>SalesTrend</Text>
      {/* Render your data here */}
    </View>
  );
};

export default SalesTrend;
