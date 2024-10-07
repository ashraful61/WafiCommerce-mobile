import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";

const SalesCategory = () => {
  const [sales, setSales] = useState(null);

  // replace with your actual token
  const bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTYzZjItYjljNy1jODg0LWQ5YWYtOWY2MWZlZjhmNzAxIiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU2M2YyLWI5ZDEtMWYzMS01NDlhLThkZGZiNDAzMWRkZSIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiMjU3ODA5M2ItZTlmYy00MjkzLWEwNTYtMjBjY2FhMjlmOWQ5IiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3OTUyMzc1LCJpYXQiOjE3Mjc5NDg3NzV9.DD74PDoOpbvDSgiEzngHn5dnIABVKgX5JN4obAdp5RnH9EM5Cp8_IxyT-SNX86i-K2FUUqypHl22jHEBC--RW_nGRCOdiJg6AUFSeVFsX0BvHJfeCOsuYo-LHrFGxw8nNnApKgYF_FM_JnSoq04-4ESebNHU22Y9XUdAJYdba4yKUs6oIATUEpwftTdXbam055LBHWTDl2BaeOsD6vLodLz4TrqobHHoZGoPQV8l9vwtBOnT3jIn4U23_VWOxOp1SNSPaktxK2XlrN-VhSqztgVTjMbaAPtKMGtznMkThF_hGuqfUIXwDmrgWqH6OEzwWxvo2xJ28FM426lmqYB0MQ";

  // fetch default-balances data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-api.waficommerce.com/api/app/dashboard/sales-by-sub-category?TimeRange=2",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        const data = await response.json();
        //remove console
        console.log(data);

        // convert result into array of objects
        const formattedData = data.xaxisCategory.map((category, index) => ({
          name: category,
          value: data.seriesData[index],
        }));
        setSales(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!sales) return <Text>loading...</Text>;
  console.log(sales);

  const colors = [
    "#ff6384", // Red
    "#36a2eb", // Blue
    "#ffce56", // Yellow
    "#4bc0c0", // Teal
    "#9966ff", // Purple
    "#ff9f40", // Orange
    // Add more colors if needed
  ];

  return (
    <View style={styles.containerSummary}>
      {/* sales by category pie chart */}

      <PieChart
        data={sales.map((item, index) => ({
          name: item.name,
          value: item.value,
          color: colors[index % colors.length], // Cycle through colors
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        }))}
        width={380}
        height={260}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: "#ffa726",
          },
        }}
        accessor={"value"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 0]}
        absolute
      />
    </View>
  );
};

export default SalesCategory;

const styles = StyleSheet.create({
  containerSummary: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
  card: {
    width: "48%", // Two cards per row
    marginBottom: 16,
  },
});
