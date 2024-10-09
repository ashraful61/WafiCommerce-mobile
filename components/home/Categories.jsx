import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { Link, LinkText } from "@gluestack-ui/themed";

const Categories = ({ navigation }) => {
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
        // Using apiClient instead of fetch
        const response = await apiClient.get(
          "/api/app/product-group?MaxResultCount=8"
        );

        // Assuming the response data structure is similar
        setCategories(response.data.items);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
        <Link onPress={() => navigation.navigate("Category")}>
          <LinkText style={styles.viewMore}>View More</LinkText>
        </Link>
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
