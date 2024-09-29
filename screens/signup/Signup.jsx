import { StyleSheet } from "react-native";
import React from "react";
import { Box, Link, LinkText, Text } from "@gluestack-ui/themed";

const Signup = ({ navigation }) => {
  return (
    <>
      <Box bg="$primary500" p="$5">
        <Text color="white">This is the Box</Text>
      </Box>

      <Link onPress={() => navigation.navigate("Login")}>
        <LinkText>go to login</LinkText>
      </Link>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({});
