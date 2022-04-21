import React, { useMemo } from "react";
import { TextInput, View, Text } from "react-native";
import { useField, useFormikContext } from "formik";

import type { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

import { styles } from "./styles";

type InputTextFormikProps = {
  label: string;
  name: string;
  required?: boolean;
  onBlur?: () => void;
  onChange?: () => void;
};

const InputTextFormik = ({
  name,
  label,
  required = false,
  onBlur,
  onChange,
}: InputTextFormikProps): JSX.Element => {
  const [field, meta] = useField(name);
  const { handleBlur, handleChange } = useFormikContext();

  const errorMsg = required && meta.touched && meta.error;

  const formikBlurHandler = useMemo(() => handleBlur(name), [name]);
  const formikChangeHandler = useMemo(() => handleChange(name), [name]);

  const blurHandler = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    formikBlurHandler(event);
    onBlur && onBlur();
  };

  const changeHandler = (text: string) => {
    formikChangeHandler(text);
    onChange && onChange();
  };

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        value={field.value}
        onChangeText={changeHandler}
        onBlur={blurHandler}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

export default InputTextFormik;
