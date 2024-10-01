import React, { useState } from "react";
import {
  AlertCircleIcon,
  ButtonText,
  EyeIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
  InputSlot,
  Link,
  LinkText,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { EyeOffIcon } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { InputIcon } from "@gluestack-ui/themed";

const PasswordChange = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // replace with your actual token
  const bearerToken =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRjFFRTM0Qjc1MkY5QzUzMkJCODhGMTlDNDRBRkFFQTc5Mjc1M0YiLCJ4NXQiOiJiUEh1TkxkUy1jVXl1NGp4bkVTdnJxZVNkVDgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiIzYTE0NWQ1ZS04NTE5LTZlMWMtMjA1NC0yNjk4ODVlODg0NTkiLCJ0ZW5hbnRpZCI6IjNhMTQ1ZDVlLTg0OWYtOTY3MS0wNmYyLThkNjIwYjAzMGQ0ZSIsInVuaXF1ZV9uYW1lIjoiYWRtaW4iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbiIsImdpdmVuX25hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJGYWxzZSIsInBob25lX251bWJlciI6IjAxNzkyOTQxMDc0IiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjoiRmFsc2UiLCJvaV9wcnN0IjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX2F1X2lkIjoiM2ExNTVhM2EtYmZkMi0zOGE4LTUwMmItODRjNTExMGRkMzc4IiwiY2xpZW50X2lkIjoiV2FmaUNvbW1lcmNlX0FwcCIsIm9pX3Rrbl9pZCI6IjNhMTU1YTNhLWJmZDktMjk2ZS1mNDJkLTk1Yjg5YmFkZjc4ZSIsImF1ZCI6IldhZmlDb21tZXJjZSIsInNjb3BlIjoiV2FmaUNvbW1lcmNlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiOWIzZjA0M2QtODUwNi00Mjg2LWFhM2ItN2JhYjUxZjI1YjIzIiwiaXNzIjoiaHR0cHM6Ly9kZXYtYXBpLndhZmljb21tZXJjZS5jb20vIiwiZXhwIjoxNzI3Nzg5MzIzLCJpYXQiOjE3Mjc3ODU3MjN9.jDJPVgSV1zRwZNW1GwT4q1YquUA9GX44hVGDQL20H6x-5LloliPbIa9m6eb6XC6PtC0eTqczWyqlzhgFfxfvj8KKFrPAcOrGWN69YWF3p-mfQS7n_j1Y6F7sgbxCbjzN01kwvNX5MqYLTaxIF1fnEcch9A5n8ehZ7IrM-VOc3jCG0CiSLwYEhus95coxBMlBBz8i1aR33FMUicrGOHBs9XLgnIJbgXwoZ3N2XGk4QnNztw4A07ENFEuzPmBML18psmIADkszTUEE7mXyo-qVhn7Go0-SKQZfo4jXpEj_aF2y8EW2J1mi8ZTjuNYoXy2zn62eHPobAgoVGS7YxV9UFg";

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://dev-api.waficommerce.com/api/account/my-profile/change-password`,
        {
          method: "POST",
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      console.log("Pasword change successful:", response.data);
      alert("Password Change Successful!");
      navigation.navigate("Profile");
    } catch (error) {
      setErrorMessage("Failed to change password. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <VStack>
      {/* form for password change */}
      <FormControl
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
      >
        <VStack space="xl">
          {/* heading */}
          <Heading color="$text500" lineHeight="$md">
            Change your current password
          </Heading>

          {/* current password field */}
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel mb="$1">
              <FormControlLabelText>Old Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* new password field */}
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel mb="$1">
              <FormControlLabelText>New Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* confirm password */}
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={true}
          >
            <FormControlLabel mb="$1">
              <FormControlLabelText>Confirm New Password</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
            <FormControlHelper>
              <FormControlHelperText>
                Must be at least 6 characters.
              </FormControlHelperText>
            </FormControlHelper>
          </FormControl>

          {/* Error Message */}
          {errorMessage ? (
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errorMessage}</FormControlErrorText>
            </FormControlError>
          ) : null}

          {/* change password button */}
          <Button
            ml="auto"
            onPress={handleChangePassword}
            isLoading={isLoading}
          >
            <ButtonText color="$white">Change Password</ButtonText>
          </Button>
        </VStack>
      </FormControl>

      {/* footer */}
      <VStack p="$4">
        <Text>Don't want to change password?</Text>
        <Link onPress={() => navigation.navigate("Profile")}>
          <LinkText color="blue">Go back to profile</LinkText>
        </Link>
      </VStack>
    </VStack>
  );
};

export default PasswordChange;
