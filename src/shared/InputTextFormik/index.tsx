import React, { useMemo, useRef, useEffect } from "react";
import { TextInput, View, Text } from "react-native";
import { useField, useFormikContext } from "formik";

import type { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

import type { TextInputProps } from "react-native";

import { styles } from "./styles";

type InputTextFormikProps = {
  label: string;
  name: string;
  focused?: boolean;
  required?: boolean;
} & Omit<TextInputProps, "ref" | "style">;

const InputTextFormik = ({
  name,
  label,
  focused,
  required = false,
  onBlur,
  onFocus,
  onChangeText,
  onSubmitEditing,
  ...inputProps
}: InputTextFormikProps): JSX.Element => {
  const [field, meta] = useField(name);
  const { handleBlur, handleChange } = useFormikContext();

  const inputRef = useRef<TextInput>(null);

  const errorMsg = required && meta.touched && meta.error;

  const formikBlurHandler = useMemo(() => handleBlur(name), [name]);
  const formikChangeHandler = useMemo(() => handleChange(name), [name]);

  const blurHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    formikBlurHandler(event);
    onBlur && onBlur(event);
  };

  const changeHandler = (text: string) => {
    formikChangeHandler(text);
    onChangeText && onChangeText(text);
  };

  useEffect(() => {
    if (!inputRef.current || !focused) return;

    inputRef.current.focus();
  }, [focused]);

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        {...inputProps}
        ref={inputRef}
        style={styles.input}
        value={field.value}
        onBlur={blurHandler}
        onFocus={onFocus}
        onChangeText={changeHandler}
        onSubmitEditing={onSubmitEditing}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

export default InputTextFormik;
