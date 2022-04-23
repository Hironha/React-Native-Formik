import React from "react";
import { Formik } from "formik";
import { View } from "react-native";

import InputTextFormik from "@shared/InputTextFormik";

import { getInitialValues, getValidationSchema } from "./util";

const ArticleForm = (): JSX.Element => {
  const initialValues = getInitialValues();
  const validationSchema = getValidationSchema();

  const titleBlurHandler = (title: string) => {
    console.log(title);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <View>
          <InputTextFormik
            required
            label="Título"
            name="title"
            onBlur={() => titleBlurHandler(values.title)}
          />
          <InputTextFormik label="Autor" name="author" required />
          <InputTextFormik label="Resumo" name="summary" required />
        </View>
      )}
    </Formik>
  );
};

export default ArticleForm;
