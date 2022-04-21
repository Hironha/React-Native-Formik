import React from "react";
import { TextInput, View, Text } from "react-native";
import { useField, useFormikContext } from "formik";

import { styles } from "./styles";

type InputTextFormikProps = {
  label: string;
  name: string;
  required?: boolean;
};

const InputTextFormik = ({ name, label, required = false }: InputTextFormikProps): JSX.Element => {
  const [field, meta] = useField(name);
  const { handleBlur, handleChange } = useFormikContext();

  const errorMsg = required && meta.touched && meta.error;

  return (
    <View style={styles.container}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        value={field.value}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

export default InputTextFormik;
