import React, { useMemo, useRef, useEffect } from "react";
import { TextInput, View, Text } from "react-native";
import { useField, useFormikContext } from "formik";

import type { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

import type { TextInputProps } from "react-native";

import { styles } from "./styles";

/*
  ** Considerações **
  1 -> Este componente deve ser utilizado somente como um filho de Formik, pois utiliza contextos definidos
    por ele;
  
  2 -> Este componente é controlado, isto é, possui um estado para definir o valor do input de texto e seu dado
    é alterado a cada mudança do texto;

  3 -> As mensagens de validação são totalmente dependentes da validação do formik, então tenha certeza
    de passar uma validação adequada.
*/

type InputTextFormikProps = {
  label: string;
  name: string;
  focused?: boolean;
} & Omit<TextInputProps, "ref" | "style">;

const InputTextFormik = ({
  name,
  label,
  focused,
  onBlur,
  onFocus,
  onChangeText,
  onSubmitEditing,
  ...inputProps
}: InputTextFormikProps): JSX.Element => {
  const [field, meta] = useField(name);
  const { handleBlur, handleChange } = useFormikContext();

  const inputRef = useRef<TextInput>(null);

  const errorMsg = meta.touched && meta.error;

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
