import React, { useEffect, useState } from "react";
import {
  AlertCircleIcon,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
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
  InputIcon,
  Link,
  LinkText,
  Text,
  Button,
  VStack,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  CheckIcon,
} from "@gluestack-ui/themed";
import * as authService from "../../services/auth-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "@gluestack-ui/themed";

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [tenant, setTenant] = useState("");
  const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved credentials if they exist
    const loadCredentials = async () => {
      const savedUsername = await AsyncStorage.getItem("username");
      const savedPassword = await AsyncStorage.getItem("password");
      const savedTenant = await AsyncStorage.getItem("tenant");

      if (savedUsername) {
        setUserNameOrEmailAddress(savedUsername);
      }
      if (savedPassword) {
        setPassword(savedPassword);
      }
      if (savedTenant) {
        setTenant(savedTenant);
      }
    };

    loadCredentials();
  }, []);

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
      // Use authService.login to login and get tokens
      const tokens = await authService.login(
        userNameOrEmailAddress,
        password,
        tenant
      );

      if (tokens) {
        // Save credentials if "Remember Me" is checked
        if (rememberMe) {
          await AsyncStorage.setItem("username", userNameOrEmailAddress);
          await AsyncStorage.setItem("password", password);
          await AsyncStorage.setItem("tenant", tenant);
        } else {
          // Clear saved credentials
          await AsyncStorage.removeItem("username");
          await AsyncStorage.removeItem("password");
          await AsyncStorage.removeItem("tenant");
        }

        // If tokens are returned, navigate to the dashboard
        console.log("Login successful");
        navigation.navigate("Dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
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

          {/* tenant field */}
          <VStack space="xs">
            <FormControl size="md" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Tenant</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Tenant name"
                  value={tenant}
                  onChangeText={(text) => setTenant(text)}
                />
              </Input>
            </FormControl>
          </VStack>

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

          {/* Remember Me checkbox */}
          <VStack space="xs">
            <Checkbox
              size="md"
              value={rememberMe}
              onValueChange={setRememberMe}
              isInvalid={false}
              isDisabled={false}
            >
              <CheckboxIndicator mr="$2">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Remember Me</CheckboxLabel>
            </Checkbox>
          </VStack>
          {/* <VStack space="xs">
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              style={{ marginVertical: 10 }}
            />
            <Text>Remember Me</Text>
          </VStack> */}

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
