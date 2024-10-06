import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import axios from "axios";

const SalesTrendScreen = () => {
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the function to fetch data
    const fetchSalesTrend = async () => {
      const url =
        "https://dev-api.waficommerce.com/api/app/my-sale/sales-trend-list";
      const bearerToken =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTYzZjItYjljNy1jODg0LWQ5YWYtOWY2MWZlZjhmNzAxIiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU2M2YyLWI5ZDEtMWYzMS01NDlhLThkZGZiNDAzMWRkZSIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiMjU3ODA5M2ItZTlmYy00MjkzLWEwNTYtMjBjY2FhMjlmOWQ5IiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3OTUyMzc1LCJpYXQiOjE3Mjc5NDg3NzV9.DD74PDoOpbvDSgiEzngHn5dnIABVKgX5JN4obAdp5RnH9EM5Cp8_IxyT-SNX86i-K2FUUqypHl22jHEBC--RW_nGRCOdiJg6AUFSeVFsX0BvHJfeCOsuYo-LHrFGxw8nNnApKgYF_FM_JnSoq04-4ESebNHU22Y9XUdAJYdba4yKUs6oIATUEpwftTdXbam055LBHWTDl2BaeOsD6vLodLz4TrqobHHoZGoPQV8l9vwtBOnT3jIn4U23_VWOxOp1SNSPaktxK2XlrN-VhSqztgVTjMbaAPtKMGtznMkThF_hGuqfUIXwDmrgWqH6OEzwWxvo2xJ28FM426lmqYB0MQ"; // Replace with your actual Bearer token
      const requestVerificationToken =
        "CfDJ8CrkdmiiRExJjeF6MViDSvphlTd1QFfoPGmSAsUVvuZGF9EHO3GQokMO4XSm0YKIhog0Ex8W30gYWeKAm68aftmyDMG-SSTnmsjij87gziDdf9rCEN9MPZFQCNfTeONju0fwedGIeYIy7nN3NTCmP7-O6E1hxFOUDj7elaXqRE1XjUoG9GkyXMpDyENrm7gA8A";

      try {
        const response = await axios.post(
          url,
          {
            timeRange: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              RequestVerificationToken: requestVerificationToken,
              "Content-Type": "application/json",
              accept: "text/plain",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );

        // Set the response data to state
        setSalesData(response.data);
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    // Call the function to fetch data
    fetchSalesTrend();
  }, []);

  // Render the result or error
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        {error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : (
          salesData && (
            <View>
              <Text>
                Total Sale Amounts: {JSON.stringify(salesData.totalSaleAmounts)}
              </Text>
              <Text>
                X-Axis Categories: {JSON.stringify(salesData.xaxisCategoryList)}
              </Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

export default SalesTrendScreen;
