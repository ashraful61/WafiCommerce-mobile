import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";

const Categories = () => {
  bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTczYTktYTUyYi1mOWMxLTlhMjAtOGIxOGQxODQyZTU2IiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU3M2E5LWE1MzgtMDhjNy05MWM5LTI5NTc2Yzk1OTkyZiIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiZGUwMzdkOWItY2ZlYS00YmZmLWJlZGYtMTIwNmYyODc5ZjE0IiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI4MjE2MDIxLCJpYXQiOjE3MjgyMTI0MjF9.mqQzfu7afR5bTolHg4XNmElgRHjpZU7LWnIQgL6PJrGgtmfzaQWLFHAbkyJtP_IUyrU2FlCvu0-n-t1dLe1QXW7inCz4PUcc760wWohE0m1XmalIjm1_xP6ydvpv7xQE3LVigx-fPBOPMIVm5SG8WV-41v0frl2lNdjZVZ6MtC7x4bnfJdy6lCNbgjcPM6_2ypzVmxwdXw4ELvAK3nafmFwXFE4-earmlvYuPpTiiwPB1tI4em0GtxjJXcv-SpJo7FPXFnmWLYTia52cp6R7XuNd0d1yAgxGfy_yJZXgf8gA0DYPHxqJNE8C2Pp-vtu78xWbcUJmdTVsHyePQgVFxA";
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);

  // Image mapping for categories
  const categoryImages = {
    Books: "https://via.placeholder.com/80x80?text=Books",
    Electronics: "https://via.placeholder.com/80x80?text=Electronics",
    Clothing: "https://via.placeholder.com/80x80?text=Clothing",
    "Home Appliances": "https://via.placeholder.com/80x80?text=Home",
    "Beauty & Personal Care":
      "https://via.placeholder.com/80x80?text=Beauty-&-Personal-Care",
    "Test 1": "https://via.placeholder.com/80x80?text=ABCD",
    "Hellow hello": "https://via.placeholder.com/80x80?text=HeyHello",
    ABDand: "https://via.placeholder.com/80x80?text=ABAbab",
  };

  // fetch data from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dev-api.waficommerce.com/api/app/product-group?MaxResultCount=8",
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
        setCategories(data.items);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // View More onPress handler
  const handleViewMore = () => {
    // Implement navigation or action when "View More" is pressed
    console.log("View More clicked");
  };

  // Render category item with placeholder images
  const renderCategoryItem = ({ item }) => {
    // Get the image based on the category name, or use a default image
    const imageUrl =
      categoryImages[item.name] ||
      "https://via.placeholder.com/80x80?text=Category";

    return (
      <View style={styles.categoryItem}>
        <Image source={{ uri: imageUrl }} style={styles.categoryImage} />
        <Text style={styles.categoryName} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {/* Categories Section */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={handleViewMore}>
          <Text style={styles.viewMore}>View More</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={4} // Show 4 items per row
        columnWrapperStyle={styles.row} // Ensure items are spaced properly in rows
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between", // Position "View More" to the right
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: "space-between", // Space out items in each row
    marginBottom: 10,
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    marginBottom: 5,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center", // Ensure the text is centered below the image
  },
});
