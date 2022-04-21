import React from "react";
import { Formik } from "formik";
import { View } from "react-native";

import InputTextFormik from "@components/InputTextFormik";

import { getInitialValues, getValidationSchema } from "./util";

const ArticleForm = (): JSX.Element => {
  const initialValues = getInitialValues();
  const validationSchema = getValidationSchema();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values }) => (
        <View>
          <InputTextFormik label="Título" name="title" required />
          <InputTextFormik label="Autor" name="author" required />
          <InputTextFormik label="Resumo" name="summary" required />
        </View>
      )}
    </Formik>
  );
};

export default ArticleForm;
