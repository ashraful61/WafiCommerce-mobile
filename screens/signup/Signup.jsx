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

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
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
          <Heading color="$text900" lineHeight="$md">
            Sign Up to Wafi Commerce
          </Heading>

          {/* username field */}
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Name
            </Text>
            <Input>
              <InputField type="text" placeholder="username" />
            </Input>
          </VStack>

          {/* email field */}
          <VStack space="xs">
            <FormControl size="md" isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField type="email" placeholder="email address" />
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
              <Input textAlign="center">
                <InputField type={showPassword ? "text" : "password"} />
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
          <Button
            ml="auto"
            onPress={() => {
              setShowModal(false);
            }}
          >
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
