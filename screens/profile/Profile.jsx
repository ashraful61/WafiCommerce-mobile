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
} from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTU5ZTctNDMwOC03NzI2LTlkYzktOTdkN2EyZjY3OGZjIiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU1OWU3LTQzMTAtNWE5ZS01ZWEzLWU2MzgyYmM2NGM4ZSIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiYmYzNDk5NDctNDMzMy00OTE3LWI0ODUtZGVkNTE5YjYzZWYzIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3NzgzODUyLCJpYXQiOjE3Mjc3ODAyNTJ9.vL4QIJLxaDxSsVqDaxdOnloGFq5LYEuupJii2fa_P9vw9GqpGUFLf99gNr9IrDEH9x-qikTWmqFydaAaQF71KTWNgu33ja5D-64LQg_8ReWVRoRH57fHXls8NNH6g11AqY6QK-oQXx3Iaxq7SNjL8N756Yp_37jJD2kCI54HQJUtYCL5i9hSCuE__JnbBwf0N-ayOVDzlXhtv6gpCR1Pk-7CLrFnCqVB0HWqd_5sszTHrLmGaH12Sspmn82IvcwF0pWnV26hmVyrHTaExpA51YcSH06uQOXJBj8GrDVv7PRCB3EjIjKFKKUpK39K4dYvdu3h5rmSMNqWQ6ZljMU3Ng";
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://dev-api.waficommerce.com/api/account/my-profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
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

  // *********  used axios but it don't work properly  *********
  // const response = await axios.get(
  //   "https://dev-api.waficommerce.com/api/account/my-profile",
  //   {
  //     headers: {
  //       accept: "*/*",
  //       Authorization: `Bearer ${bearerToken}`,
  //       "X-Requested-With": "XMLHttpRequest",
  //     },
  //   }
  // );
  //       setProfileData(response.data);
  //     } catch (error) {
  //       setErrorMessage("Failed to load profile data!");
  //       console.error("Error fetching profile data:", error.response);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

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
      </VStack>
    </View>
  );
};

export default Profile;
