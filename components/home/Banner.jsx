import { VStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

// this is not yet API based

const { width } = Dimensions.get("window");

const Banner = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const BannerImages = [
    { id: 1, image: "https://via.placeholder.com/400x200?text=Slide+1" },
    { id: 2, image: "https://via.placeholder.com/400x200?text=Slide+2" },
    { id: 3, image: "https://via.placeholder.com/400x200?text=Slide+3" },
    { id: 4, image: "https://via.placeholder.com/400x200?text=Slide+4" },
  ];

  const renderBannerComponents = ({ item }) => {
    return (
      <Image
        source={{ uri: item.image }}
        style={styles.bannerImage}
        resizeMode="cover"
      />
    );
  };

  return (
    <VStack space="md" style={styles.carouselContainer}>
      <Carousel
        data={BannerImages}
        renderItem={renderBannerComponents}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay={true} // Enable auto-sliding
        autoplayDelay={1000} // Delay before auto-sliding starts
        autoplayInterval={3000} // Interval between slides
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        loop={true} // Loop slides infinitely
      />
      {/* Pagination dots */}
      <Pagination
        dotsLength={BannerImages.length}
        activeDotIndex={activeSlide}
        containerStyle={{ paddingVertical: 8 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </VStack>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
  },
  bannerImage: {
    width: width,
    height: 200,
  },
});

export default Banner;
