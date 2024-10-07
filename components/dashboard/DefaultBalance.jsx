import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";

const DefaultBalance = () => {
  const [balances, setBalances] = useState(null);

  // replace with your actual token
  const bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTYzYWUtN2JiYi0xYjhiLWU2YWMtOTIzOTA1YmZjZWI3IiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU2M2FlLTdjNzgtYWU2Zi00ZTRhLWU4YzI3Y2FkNWM4MCIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiZGExYzE0NDctMmZmNC00NDU0LThiZmYtMGI5N2U2MGUxODQwIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3OTQ3OTAzLCJpYXQiOjE3Mjc5NDQzMDN9.uF4LKfBPYmJuNoGMHDpklb0px2ctSyj93v0esSSVEgv1wmZZPdu4XLaE2RJesmDhd0N5vw_7x9snJZMFFqwzEcuTwsxZK8CT6rSlt7GvY44lPT8LQkkP6gfMaIOREUT3kx3rcQK65QDknl4baJGZwr7WjZBldwwQnuwe77ReAW0IbyJrGz9JIUWzoyHticOciuzPlhcWtJglR3EpWjBmE1b_8SrG0v25Lb30lrnf16FsE4Mu_8xFrdohge6zhLiV8VHs4JdYJG9Dj6KHyi_TAWSLMxRVEDM9iTIuJ-6Cu15Tee8GX-GcJd3nv2SB-th0gs7j3Ab9GCxgH9K_rQpM2A";

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

  // Fetch default-balances data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call using apiClient
        const response = await apiClient.get(
          "/api/app/dashboard/default-balances?timeRange=2"
        );
        setBalances(response.data);
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
