import React, { useMemo } from "react";
import { Formik } from "formik";
import { View } from "react-native";

import InputTextFormik from "@shared/InputTextFormik";

import { useAutofocus } from "@hooks/useAutoFocus";

import { getInitialValues, getValidationSchema } from "./util";

import type { ArticleFormValues } from "./util";

type UsedArticleValues = Omit<ArticleFormValues, "published" | "published_at">;

const INIT_INPUTS_FOCUS: {
  [key in keyof UsedArticleValues]: boolean;
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
  const validationSchema = useMemo(() => getValidationSchema(), []);

  const titleBlurHandler = (title: string) => {
    console.log(title);
  };

  const getFocusHandler = (key: keyof UsedArticleValues) => () => {
    setFocus(key);
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
            label="Título"
            name="title"
            focused={focus.title}
            onFocus={getFocusHandler("title")}
            onSubmitEditing={focusNext}
            onBlur={() => titleBlurHandler(values.title)}
          />
          <InputTextFormik
            label="Autor"
            name="author"
            focused={focus.author}
            onFocus={getFocusHandler("author")}
            onSubmitEditing={focusNext}
          />
          <InputTextFormik
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
