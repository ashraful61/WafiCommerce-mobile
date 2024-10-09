import { useState, useEffect } from "react";
import { VStack, Button, Text } from "@gluestack-ui/themed";
import ProductCard from "./ProductCard";
import apiClient from "../../../../services/api-client";

const ProductList = ({ categoryId, subcategoryId }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (categoryId) {
      fetchProducts(categoryId, subcategoryId);
    }
  }, [categoryId, subcategoryId]);

  const fetchProducts = async (categoryId, subcategoryId) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/app/product`, {
        params: {
          categoryId,
          subcategoryId,
          page,
          pageSize: 10, // Adjust as needed
        },
      });
      setProducts((prevProducts) => [...prevProducts, ...response.data.items]);
      setHasMore(response.data.items.length > 0); // Stop if no more items
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(page + 1);
      fetchProducts(categoryId, subcategoryId);
    }
  };

  return (
    <VStack space={4}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {hasMore && (
        <Button onPress={loadMore} isLoading={loading}>
          <Text>Load More</Text>
        </Button>
      )}
    </VStack>
  );
};

export default ProductList;
