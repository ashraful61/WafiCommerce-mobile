import React from "react";
import {
  HStack,
  Link,
  LinkText,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";

const Index = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-sky-300 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <View className="relative mt-5">
            <Text className="text-lg text-white font-bold text-center">
              Discover Endless Possibilities with
            </Text>
            <Text className="text-2xl font-extrabold text-center text-secondary-200">
              Wafi Commerce
            </Text>
          </View>
          <Text className="text-sm font-pregular text-center text-black mt-7">
            Links for different screens below
          </Text>

          {/* links for navigating to another screen */}
          <VStack>
            <Link onPress={() => navigation.navigate("Dashboard")}>
              <LinkText color="blue">Go to Dashboard</LinkText>
            </Link>

            <Link onPress={() => navigation.navigate("Signup")}>
              <HStack>
                <Text className="text-gray-700">New to wafi commerce?</Text>
                <LinkText color="blue">signup</LinkText>
              </HStack>
            </Link>

            <Link onPress={() => navigation.navigate("Login")}>
              <HStack>
                <Text className="text-gray-700">Existing user</Text>
                <LinkText color="blue">Login</LinkText>
              </HStack>
            </Link>

            <HStack>
              <Text className="text-gray-700">Forgot Password?</Text>
              <Link onPress={() => navigation.navigate("PasswordChange")}>
                <LinkText color="blue">Change Password</LinkText>
              </Link>
            </HStack>
          </VStack>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Index;
