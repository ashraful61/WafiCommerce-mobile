import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

const ProductGrids = () => {
  bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTczYTktYTUyYi1mOWMxLTlhMjAtOGIxOGQxODQyZTU2IiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU3M2E5LWE1MzgtMDhjNy05MWM5LTI5NTc2Yzk1OTkyZiIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiZGUwMzdkOWItY2ZlYS00YmZmLWJlZGYtMTIwNmYyODc5ZjE0IiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI4MjE2MDIxLCJpYXQiOjE3MjgyMTI0MjF9.mqQzfu7afR5bTolHg4XNmElgRHjpZU7LWnIQgL6PJrGgtmfzaQWLFHAbkyJtP_IUyrU2FlCvu0-n-t1dLe1QXW7inCz4PUcc760wWohE0m1XmalIjm1_xP6ydvpv7xQE3LVigx-fPBOPMIVm5SG8WV-41v0frl2lNdjZVZ6MtC7x4bnfJdy6lCNbgjcPM6_2ypzVmxwdXw4ELvAK3nafmFwXFE4-earmlvYuPpTiiwPB1tI4em0GtxjJXcv-SpJo7FPXFnmWLYTia52cp6R7XuNd0d1yAgxGfy_yJZXgf8gA0DYPHxqJNE8C2Pp-vtu78xWbcUJmdTVsHyePQgVFxA";
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://dev-api.waficommerce.com/api/app/product",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProducts(data.items);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  // Example products
  const demoProducts = [
    {
      id: 1,
      name: "Smartphone",
      price: "$500",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Blender",
      price: "$80",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Laptop",
      price: "$1200",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Fruits",
      price: "$1200",
      image: "https://via.placeholder.com/150",
    },
  ];

  // Render product item
  const renderProductItem = ({ item }) => {
    return (
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {/* Products Section */}
      <Text style={styles.sectionTitle}>Products</Text>
      <FlatList
        data={demoProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productsList}
      />

      {/* Products from API */}
      <Text style={styles.sectionTitle}>Products from API</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productsList}
      />
    </View>
  );
};

export default ProductGrids;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  productsList: {
    paddingLeft: 16,
  },
  productItem: {
    width: 150,
    marginRight: 20,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "gray",
  },
});
