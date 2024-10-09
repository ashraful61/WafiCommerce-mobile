import { HStack, Button, Text } from "@gluestack-ui/themed";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    console.log(`Added ${product.name} to cart`);
    // Add to cart functionality
  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <Text>{product.name}</Text>
      <Button onPress={handleAddToCart}>
        <Text>Add</Text>
      </Button>
    </HStack>
  );
};

export default ProductCard;
