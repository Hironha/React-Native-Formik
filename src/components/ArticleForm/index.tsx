import React from "react";
import { Formik } from "formik";
import { View } from "react-native";

import InputTextFormik from "@shared/InputTextFormik";

import { useAutofocus } from "@hooks/useAutofocus";

import { getInitialValues, getValidationSchema } from "./util";

import type { ArticleFormValues } from "./util";

const INIT_INPUTS_FOCUS: {
  [key in keyof Omit<ArticleFormValues, "published" | "published_at">]: boolean;
} = {
  title: true,
  author: false,
  summary: false,
  // published: false,
  // published_at: false,
};

const ArticleForm = (): JSX.Element => {
  const [focus, setFocus, focusNext] = useAutofocus(INIT_INPUTS_FOCUS);

  const initialValues = getInitialValues();
  const validationSchema = getValidationSchema();

  const titleBlurHandler = (title: string) => {
    console.log(title);
  };

  const getFocusHandler = (key: keyof Omit<ArticleFormValues, "published" | "published_at">) => {
    return () => {
      setFocus(key);
    };
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
            focused={focus.title}
            onFocus={getFocusHandler("title")}
            onSubmitEditing={focusNext}
            onBlur={() => titleBlurHandler(values.title)}
          />
          <InputTextFormik
            required
            label="Autor"
            name="author"
            focused={focus.author}
            onFocus={getFocusHandler("author")}
            onSubmitEditing={focusNext}
          />
          <InputTextFormik
            required
            label="Resumo"
            name="summary"
            focused={focus.summary}
            onFocus={getFocusHandler("summary")}
            onSubmitEditing={focusNext}
          />
        </View>
      )}
    </Formik>
  );
};

export default ArticleForm;
