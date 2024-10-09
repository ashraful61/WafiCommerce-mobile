import { useState } from "react";
import { HStack, VStack } from "@gluestack-ui/themed";
import CategoryList from "../../components/home/categories/category/CategoryList";
import SubcategoryList from "../../components/home/categories/category/SubcategoryList";
import ProductList from "../../components/home/categories/category/ProductList";

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null); // Reset subcategory
  };

  const handleSubcategorySelect = (subcategoryId) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <View>
      <Text>asd</Text>
    </View>
    // <HStack>
    //   {/* Left: Category List */}
    //   {/* <VStack>
    //     <CategoryList onCategorySelect={handleCategorySelect} />
    //   </VStack>

    //   {/* Right: Subcategories and Products */}
    //   <VStack>
    //     <SubcategoryList
    //       categoryId={selectedCategory}
    //       onSubcategorySelect={handleSubcategorySelect}
    //     />
    //     <ProductList
    //       categoryId={selectedCategory}
    //       subcategoryId={selectedSubcategory}
    //     />
    //   </VStack>
    // </HStack>
  );
};

export default CategoryPage;
