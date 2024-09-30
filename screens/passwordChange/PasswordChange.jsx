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
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => !showState);
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

          {/* username field */}
          {/* <VStack space="xs">
            <Text color="$text500" bold={true} lineHeight="$xs">
              Name = username
            </Text>
          </VStack> */}

          {/* password field */}
          <VStack space="xs">
            {/* old password */}
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

            {/* new password */}
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

            {/* confirm password */}
            <FormControl
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>
                  Confirm New Password
                </FormControlLabelText>
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

          {/* error message */}

          {/* signup button */}
          <Button ml="auto" inLoading={isLoading}>
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
