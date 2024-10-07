//modify this code based on sales category page

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BarChart } from "react-native-chart-kit";

const TopSellingProduct = () => {
  const [topSales, setTopSales] = useState([]);

  // Replace with your actual token
  const bearerToken = "YOUR_BEARER_TOKEN";

  // Fetch top selling products data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-api.waficommerce.com/api/app/dashboard/top-sold-product-list?TimeRange=2&TopCount=5",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        // Check if response is OK
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        console.log(data); // Check the data structure

        // Check that the required properties exist in the response
        if (data && data.xaxisCategory && data.seriesData) {
          // Convert result into an array of objects
          const formattedData = data.xaxisCategory.map((category, index) => ({
            name: category,
            value: data.seriesData[index],
          }));
          setTopSales(formattedData);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!topSales.length) return <Text>Loading...</Text>;

  // Prepare data for BarChart
  const labels = topSales.map((item) => item.name);
  const values = topSales.map((item) => item.value);

  return (
    <View style={styles.containerSummary}>
      <Text
        style={{
          fontSize: 20,
          color: "orange",
          paddingLeft: 10,
          paddingTop: 10,
        }}
      >
        Top Selling Products
      </Text>
      <BarChart
        style={{
          paddingVertical: 8,
          paddingHorizontal: 4,
        }}
        data={{
          labels: labels,
          datasets: [
            {
              data: values,
            },
          ],
        }}
        width={360}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          barPercentage: 0.5,
        }}
        verticalLabelRotation={0}
      />
    </View>
  );
};

export default TopSellingProduct;

const styles = StyleSheet.create({
  containerSummary: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 16,
  },
});
