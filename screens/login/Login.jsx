import React, { useState } from "react";
import axios from "axios";
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

const Login = ({ navigation }) => {
  const APIendpoint = "https://dev-api.waficommerce.com/api/account/login";
  const [showPassword, setShowPassword] = useState(false);
  const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleLogin = async () => {
    if (!userNameOrEmailAddress || !password) {
      setErrorMessage("Email and Password are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        APIendpoint,
        {
          userNameOrEmailAddress,
          password,
          rememberMe,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            RequestVerificationToken:
              "CfDJ8CrkdmiiRExJjeF6MViDSvqHARBBqHwXf737JPC_dv5dHbMxYCDI-WNxevStDT-tWAbGR3HMuUmPOA9r6ImC3mCPkdRiQg2O2-xyCxV_i78mMm535_TWdSoXcgNuxlZ9yTdt5mum8DXq0f1djqrswpA",
          },
        }
      );

      // Handle successful login
      console.log("Login successful:", response.data);
      alert("Login Successful!");
      navigation.navigate("Dashboard"); // Navigate to the dashboard after login
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error
      );
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack>
      {/* form for login */}
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
            Login to Wafi Commerce
          </Heading>

          {/* email field */}
          <VStack space="xs">
            <FormControl size="md" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email or Username</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Email or Username"
                  value={userNameOrEmailAddress}
                  onChangeText={(text) => setUserNameOrEmailAddress(text)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be a valid email or username.
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </VStack>

          {/* password field */}
          <VStack space="xs">
            <FormControl size="md" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
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
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  At least 6 characters are required.
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          {/* Error message */}
          {errorMessage ? (
            <Text color="red" mb="$2">
              {errorMessage}
            </Text>
          ) : null}

          {/* login button */}
          <Button ml="auto" onPress={handleLogin} isLoading={isLoading}>
            <ButtonText color="$white">Login</ButtonText>
          </Button>
        </VStack>
      </FormControl>

      {/* footer */}
      <VStack p="$4">
        <Text>Don't have an account?</Text>
        <Link onPress={() => navigation.navigate("Signup")}>
          <LinkText color="blue">Signup here</LinkText>
        </Link>
      </VStack>
    </VStack>
  );
};

export default Login;
