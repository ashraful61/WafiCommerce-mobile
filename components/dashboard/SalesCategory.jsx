import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
import apiClient from "../../services/api-client"; // Import the API client

const SalesCategory = () => {
  const [sales, setSales] = useState(null);

  // fetch sales-by-category data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          "/api/app/dashboard/sales-by-sub-category?TimeRange=2"
        );

        const data = response.data;
        // Convert result into array of objects
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

  if (!sales) return <Text>Loading...</Text>;

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
