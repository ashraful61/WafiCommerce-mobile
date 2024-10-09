// import { useState, useEffect } from "react";
// import { VStack, Button, Text } from "@gluestack-ui/themed";
// import apiClient from "../../../../services/api-client";

// const CategoryList = ({ onCategorySelect }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     // Fetch categories API
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await apiClient.get("/api/app/product-group");
//       console.log(response);
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   return (
//     <VStack space={4}>
//       {categories.map((category) => (
//         <Button key={category.id} onPress={() => onCategorySelect(category.id)}>
//           <Text>{category.name}</Text>
//         </Button>
//       ))}
//     </VStack>
//   );
// };

// export default CategoryList;
