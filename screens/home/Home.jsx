import React from "react";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import Banner from "../../components/home/Banner";
import Categories from "../../components/home/Categories";
import ProductGrids from "../../components/home/ProductGrids";

// Get the window dimensions
const { width } = Dimensions.get("window");

const Home = () => {
  return (
    <ScrollView style={styles.container || {}}>
      {/* banner section */}
      <Banner />

      {/* Categories Section */}
      <Categories />

      {/* Products Section */}
      <ProductGrids />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
});
