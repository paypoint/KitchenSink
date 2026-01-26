import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { AppInput } from "./AppInput";

type Props = {
  label?: string;                       // Field label
  value?: string;                       // Input value
  onChangeText?: (text: string) => void;// Text change handler
  error?: string;                       // Error message
};

export function PasswordInput({
  label = "Password",
  value,
  onChangeText,
  error,
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <AppInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={!show}
      error={error}
      rightIcon={show ? "visibility-off" : "visibility"}
      onRightIconPress={() => setShow(!show)}
    />
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});

/*
Usage Example:

<PasswordInput
  label="Password"
  value={password}
  onChangeText={setPassword}
/>
*/
