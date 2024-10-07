import React, { useState, useEffect } from "react";
import {
  View,
  Divider,
  Heading,
  Link,
  LinkText,
  Text,
  VStack,
  HStack,
  Button,
} from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import apiClient from "../../services/api-client"; // Import your apiClient
import * as authService from "../../services/auth-service";

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Use apiClient to fetch profile data
        const response = await apiClient.get("/api/account/my-profile");

        // Check if response is successful
        const data = response.data;
        setProfileData(data);
      } catch (error) {
        setErrorMessage("Failed to load profile data!");
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigation.navigate("Login");
    } catch (error) {
      console.error("logout failed:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center", // Center the content vertically
        alignItems: "center", // Center the content horizontally
        padding: 20, // Optional padding
      }}
    >
      <VStack
        p="$4"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10, // Make the container rounded
          padding: 20, // Padding inside the container
          width: "80%", // Adjust width as needed
          backgroundColor: "#f9f9f9", // Optional background color
        }}
      >
        <Heading color="$text500">My Profile</Heading>

        {/* Username */}
        <HStack mt={4}>
          <Text bold={true}>Username: </Text>
          <Text>{profileData.userName}</Text>
        </HStack>

        {/* Email */}
        <HStack mt={4}>
          <Text bold={true}>Email: </Text>
          <Text>{profileData.email}</Text>
        </HStack>

        {/* Phone Number */}
        <HStack mt={4}>
          <Text bold={true}>Phone Number: </Text>
          <Text>{profileData.phoneNumber}</Text>
        </HStack>

        <Divider my={4} />

        <Link onPress={() => navigation.navigate("PasswordChange")}>
          <LinkText color="blue">Change Password</LinkText>
        </Link>

        {/* logout button */}
        <Button
          onPress={handleLogout}
          mt={6}
          backgroundColor="red"
          color="white"
          _text={{ color: "white" }}
        >
          <Text>Logout</Text>
        </Button>
      </VStack>
    </View>
  );
};

export default Profile;
