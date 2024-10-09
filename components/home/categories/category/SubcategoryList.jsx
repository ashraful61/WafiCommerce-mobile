import { useState, useEffect } from "react";
import { HStack, Button, Text } from "@gluestack-ui/themed";
import apiClient from "../../../../services/api-client";

const SubcategoryList = ({ categoryId, onSubcategorySelect }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchSubcategories(categoryId);
    }
  }, [categoryId]);

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await apiClient.get(
        `/api/app/product-subgroup/${categoryId}`
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <HStack space={4}>
      {subcategories.map((subcategory) => (
        <Button
          key={subcategory.id}
          onPress={() => onSubcategorySelect(subcategory.id)}
        >
          <Text>{subcategory.name}</Text>
        </Button>
      ))}
    </HStack>
  );
};

export default SubcategoryList;
