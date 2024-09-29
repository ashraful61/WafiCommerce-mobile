import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import Carousel from "react-native-snap-carousel";

const Dashboard = () => {
  const summary = [
    {
      id: 1,
      title: "Current Cash Balance",
      data: "1,09,51,590$",
      bgColor: "#ace0fc",
      textColor: "#2F8BE6",
    },
    {
      id: 2,
      title: "Current Bank Balance",
      data: "8,15,720$",
      bgColor: "#DCBDFF",
      textColor: "#975AFF",
    },
    {
      id: 3,
      title: "Current Due",
      data: "1,96,350$",
      bgColor: "#BDF8B6",
      textColor: "#40C057",
    },
    {
      id: 4,
      title: "Sales",
      data: "12,49,660$",
      bgColor: "#FEDBA1",
      textColor: "#F77E17",
    },
    {
      id: 5,
      title: "Gross Profit",
      data: "49,270$",
      bgColor: "#ACE0FC",
      textColor: "#2F8BE6",
    },
    {
      id: 6,
      title: "GP Percentage",
      data: "4%",
      bgColor: "#DCBDFF",
      textColor: "#975AFF",
    },
  ];

  // Function to render each summary item
  const renderSummaryItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "column",
          borderRadius: 10,
          padding: 12,
          backgroundColor: item.bgColor,
          //width: Dimensions.get("window").width * 0, // Adjust width to make the cards responsive inside the carousel
          marginHorizontal: 0, // Add some spacing between the cards
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: item.textColor,
          }}
        >
          {item.data}
        </Text>
        <Text style={{ fontSize: 20, color: item.textColor }}>
          {item.title}
        </Text>
      </View>
    );
  };

  const pieData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 9,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 9,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "orange",
      legendFontColor: "#7F7F7F",
      legendFontSize: 9,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 9,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 9,
    },
  ];

  const barData = {
    labels: ["Blender", "Shirt", "TV", "Mobile", "PC", "Jute"],
    datasets: [
      {
        data: [201457, 455899, 28453, 804548, 99452, 437488],
      },
    ],
  };

  return (
    <SafeAreaView className="bg-[#161622] h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full my-4"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-3xl font-bold text-orange-400 mb-4 text-center">
            Dashboard
          </Text>

          {/* summary cards */}
          <View className="mb-4">
            <Carousel
              data={summary}
              renderItem={renderSummaryItem}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width * 0.6} // Size of each card
              loop={true}
              className="bg-white"
            />
          </View>

          {/* sales overview line chart */}
          <View className="bg-black border rounded-2xl mx-4 my-4">
            <Text className="text-lg text-orange-400 pl-3 pt-2">
              Sales overview
            </Text>
            <LineChart
              data={{
                labels: ["Jan", "feb", "mar", "apr", "may", "jun"],
                datasets: [
                  {
                    data: [10, 20, 30, 15, 50, 36],
                  },
                ],
                legend: ["Sales Trend"],
              }}
              width={380}
              height={180}
              yAxisLabel="$"
              fromZero={true}
              chartConfig={{
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              style={{
                marginVertical: 8,
                borderRadius: 24,
              }}
            />
          </View>

          {/* sales by category pie chart */}
          <View className="bg-black border rounded-3xl mx-4 my-4">
            <PieChart
              data={pieData}
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
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 0]}
              absolute
            />
          </View>

          {/* top selling products bar chart */}
          <View className="bg-black border rounded-2xl mx-4 my-4">
            <Text className="text-lg text-orange-400 pl-3 pt-2">
              Top Selling Products
            </Text>
            <BarChart
              style={{
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
              data={barData}
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

          {/* top customer dues bar chart */}
          <View className="bg-black border rounded-2xl mx-4 my-4">
            <Text className="text-lg text-orange-400 pl-3 pt-2">
              Top Customer Dues
            </Text>
            <BarChart
              style={{
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
              data={barData}
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

          {/* top customer list bar chart */}
          <View className="bg-black border rounded-2xl mx-4 my-4">
            <Text className="text-lg text-orange-400 pl-3 pt-2">
              Top Customer List
            </Text>
            <BarChart
              style={{
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
              data={barData}
              width={360}
              height={200}
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

          {/* top gross profitable products bar chart */}
          <View className="bg-black border rounded-2xl mx-4 my-4">
            <Text className="text-lg text-orange-400 pl-3 pt-2">
              Top Gross Profitable Products
            </Text>
            <BarChart
              style={{
                paddingVertical: 8,
                paddingHorizontal: 4,
              }}
              data={barData}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
