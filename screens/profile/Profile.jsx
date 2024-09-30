import React from "react";
import { Link, LinkText, View } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";

const Profile = ({ navigation }) => {
  return (
    <View>
      <Text>Profile</Text>
      <Link onPress={() => navigation.navigate("PasswordChange")}>
        <LinkText color="blue" backgroundColor="yellow">
          Change your password
        </LinkText>
      </Link>
    </View>
  );
};

export default Profile;
