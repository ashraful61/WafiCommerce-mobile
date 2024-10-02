import React, { useState } from "react";
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
} from "@gluestack-ui/themed";

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [appName] = useState("WafiCommerce");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const handleSignup = async () => {
    if (!userName || !emailAddress || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://dev-api.waficommerce.com/api/account/register`,
        {
          method: "POST",
          body: JSON.stringify({
            userName,
            emailAddress,
            password,
            appName,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      // handle success
      console.log("Signup successful:", response.data);
      alert("Signup Successful!");
      navigation.navigate("Login");
    } catch (error) {
      console.log("sign up error" + JSON.stringify(error));
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack>
      {/* form for signup */}
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
            Sign Up to Wafi Commerce
          </Heading>

          {/* username field */}
          <VStack space="xs">
            <Text color="$text500" bold={true} lineHeight="$xs">
              Name
            </Text>
            <Input>
              <InputField
                type="text"
                placeholder="username"
                value={userName}
                onChangeText={(text) => setUserName(text)}
              />
            </Input>
          </VStack>

          {/* email field */}
          <VStack space="xs">
            <FormControl size="md" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="email"
                  placeholder="email address"
                  value={emailAddress}
                  onChangeText={(text) => setEmailAddress(text)}
                />
              </Input>
              <FormControlHelper>
                <FormControlHelperText>
                  Must be a valid email address.
                </FormControlHelperText>
              </FormControlHelper>
            </FormControl>
          </VStack>

          {/* password field */}
          <VStack space="xs">
            <FormControl
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            >
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
                  {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
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

          {/* error message */}
          {errorMessage ? (
            <Text color="red" mb="$2">
              {errorMessage}
            </Text>
          ) : null}

          {/* signup button */}
          <Button ml="auto" onPress={handleSignup} inLoading={isLoading}>
            <ButtonText color="$white">Sign Up</ButtonText>
          </Button>
        </VStack>
      </FormControl>

      {/* footer */}
      <VStack p="$4">
        <Text>Have an account already?</Text>
        <Link onPress={() => navigation.navigate("Login")}>
          <LinkText color="blue">Login</LinkText>
        </Link>
      </VStack>
    </VStack>
  );
};

export default Signup;
