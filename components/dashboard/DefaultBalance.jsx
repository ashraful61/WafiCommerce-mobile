import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

const DefaultBalance = () => {
  const [balances, setBalances] = useState(null);

  // replace with your actual token
  const bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTVmOGEtYjAxOS0yZTQwLTE5NmEtM2Y0ZTVlZTkwYmUyIiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU1ZjhhLWIwM2QtNGM2My04OGE5LTI2Zjg1M2E1ZTcwMiIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiODZkZWEwYTktN2VkYy00NDY1LWEwMDYtNmZiZjhjYzEwOGM0IiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3ODc4NDQ4LCJpYXQiOjE3Mjc4NzQ4NDh9.EhAikjmBHIQ1Dv5P7s6PzzzUCp81hRUkp29AUwXw2s5CiGzgvqtp7MRDCOd9Pu8zFWpsP96GqOtjrHxRCytlcZATTC5vRb7P9ghRwhvuSaC4cXhQiGc6DvV5YAoB1Kw1hjyGpLvplWrcWbYXFmKa_i0286A6vG3J6N85ZEd8cv6CAEeUKF7BtnLJ_0eBnONd2aFDQsBXpABzzPsTTIuDI8lmZN-sZZvVsrLVHc7lFjF1KftAlEn3JFsMiq05AZQvzJs3LATa_1-rs8DKcLUJ0MbXBk6Z_nwlNGwFijfDjysHAprFGMCh1IkzrlZs3tkcYmti8Mt_PTRjz7WVPZZQdw";

  const cardDetails = {
    cashAccountBalance: {
      title: "Cash Account",
      icon: "cash-icon",
      backgroundColor: "#FFB6C1",
    },
    bankAccountBalance: {
      title: "Bank Account",
      icon: "bank-icon",
      backgroundColor: "#87CEEB",
    },
    saleAccountBalance: {
      title: "Sales Account",
      icon: "sales-icon",
      backgroundColor: "#FFD700",
    },
    totalProfit: {
      title: "Total Profit",
      icon: "profit-icon",
      backgroundColor: "#90EE90",
    },
    totalDue: {
      title: "Total Due",
      icon: "due-icon",
      backgroundColor: "#FFA07A",
    },
  };

  // fetch default-balances data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dev-api.waficommerce.com/api/app/dashboard/default-balances?timeRange=2",
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
        setBalances(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!balances) return <Text>loading...</Text>;
  console.log(balances);

  // adding 6th card with formula
  const calculatedValue = Math.floor(
    (balances.totalProfit / balances.saleAccountBalance) * 100
  );
  console.log(calculatedValue);

  const calculatedCard = {
    title: "GP Percentage",
    icon: "calc-icon",
    backgroundColor: "#3aba4d",
    value: `${calculatedValue}`,
  };

  const balanceEntries = Object.entries(balances).map(([key, value]) => ({
    key,
    value,
    title: cardDetails[key].title,
    icon: cardDetails[key].icon,
    backgroundColor: cardDetails[key].backgroundColor,
  }));
  console.log(balanceEntries);
  return (
    <View style={styles.containerSummary}>
      {/* summary cards */}
      {balanceEntries.map((entry) => (
        <View
          key={entry.key}
          style={styles.card}
          backgroundColor={entry.backgroundColor}
        >
          <Text>{entry.value}</Text>
          <Text>{entry.title}</Text>
        </View>
      ))}

      {/* calculated card */}
      <View
        key={calculatedCard.key}
        style={styles.card}
        backgroundColor={calculatedCard.backgroundColor}
      >
        <Text>{calculatedCard.value}</Text>
        <Text>{calculatedCard.title}</Text>
      </View>
    </View>
  );
};

export default DefaultBalance;

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
