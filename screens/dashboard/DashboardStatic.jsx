// THIS IS DASHBOARD DESIGN
// STATIC DATA SHOWCASE

// HAVE USED
//     COROUSEL,
//     PIECHART,
//     LINEGRAPH,
//     BARCHART

import { Dimensions, ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart, LineChart, PieChart } from "react-native-chart-kit";
import Carousel from "react-native-snap-carousel";
import { Link, LinkText } from "@gluestack-ui/themed";

const Dashboard = ({ navigation }) => {
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
          <Link onPress={() => navigation.navigate("Profile")}>
            <LinkText color="blue" backgroundColor="yellow">
              Go to your Profile
            </LinkText>
          </Link>

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

          {/* sales trend line chart */}
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

// import React, { useEffect, useState } from "react";
// import { Card, ScrollView, Text, View } from "@gluestack-ui/themed";
// import { StyleSheet } from "react-native";

// const Dashboard = () => {
//   const [balances, setbalances] = useState(null);

//   // replace with your actual token
//   const bearerToken =
//     "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTVlYjMtNGY3Yi0yMDEzLTg5M2MtNDI3NDgwZTAwMGIzIiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU1ZWIzLTRmYWItMjk3Yi1jNGYxLTI3MTQyMTU1MzkwYiIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiYTdhYWNkNDMtZTljYy00ZmY5LTkzMWYtODM0ZWZiYjU4ZTJkIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3ODY0MzMzLCJpYXQiOjE3Mjc4NjA3MzN9.WaQTWhmK7DEm2pY2StIATGyuMQdOuvEtuHhmKeM11CrRtetFBXHv0S4J71V2LM2P3nI3x6PrMvCk4t81srlDXCAGVPvGCuQZrWT53tgbawYi6XYvZG1NzvgHKUg5Vt1FHGUtGqyHeH4ZePvBNIl6uWJIMZz7C6MaOqP4WZSUn_0ypFol1be6RuEEnAyWCVbajvzW-SP3-Owp2ykee-2rpSwriW5PT3E0Fha4c7oezYz_axGejZLhRf7_4zio_8GP65wpgxa5Gtqpk7ThYJRVa8B56Cg3LF8Lj1e_LJfjboCOWgXsL-9KGQQZOo3Zsz7ZgwGX5b9JdziBCNumHRZx5w";

//   const cardDetails = {
//     cashAccountBalance: {
//       title: "Cash Account",
//       icon: "cash-icon",
//       backgroundColor: "#FFB6C1",
//     },
//     bankAccountBalance: {
//       title: "Bank Account",
//       icon: "bank-icon",
//       backgroundColor: "#87CEEB",
//     },
//     saleAccountBalance: {
//       title: "Sales Account",
//       icon: "sales-icon",
//       backgroundColor: "#FFD700",
//     },
//     totalProfit: {
//       title: "Total Profit",
//       icon: "profit-icon",
//       backgroundColor: "#90EE90",
//     },
//     totalDue: {
//       title: "Total Due",
//       icon: "due-icon",
//       backgroundColor: "#FFA07A",
//     },
//   };

//   // fetch default-balances data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://dev-api.waficommerce.com/api/app/dashboard/default-balances?timeRange=2",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${bearerToken}`,
//             },
//           }
//         );
//         const data = await response.json();
//         console.log(data);
//         setbalances(data);
//         console.log(balances);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   if (!balances) return <Text>loading...</Text>;
//   console.log(balances);

//   // adding 6th card with formula
//   const calculatedValue = Math.floor(
//     (balances.totalProfit / balances.saleAccountBalance) * 100
//   );
//   const calculatedCard = {
//     title: "Calculated",
//     icon: "calc-icon",
//     backgroundColor: "#6a5acd",
//     value: `${calculatedValue}`,
//   };

//   const balanceEntries = Object.entries(balances);

//   return (
//     <ScrollView>
//       {/* summary cards */}
//       <View>
//         {/* from API */}
//         {balanceEntries.map(([key, value], index) => (
//           <Card
//             key={key}
//             title={cardDetails[key].title}
//             icon={cardDetails[key].icon}
//             value={`$${value.toFixed(2)}`}
//             backgroundColor={cardDetails[key].backgroundColor}
//             style={styles.card}
//           />
//         ))}
//         {/* from calculated */}
//         <Card
//           key="calculated"
//           title={calculatedCard.title}
//           icon={calculatedCard.icon}
//           value={calculatedCard.value}
//           backgroundColor={calculatedCard.backgroundColor}
//           style={styles.card}
//         />
//       </View>
//     </ScrollView>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     padding: 16,
//   },
//   card: {
//     width: "48%", // Two cards per row
//     marginBottom: 16,
//   },
// });
