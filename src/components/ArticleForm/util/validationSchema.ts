import * as Yup from "yup";

import type { ArticleFormValues } from "./initialValues";

export const getValidationSchema = (): Yup.SchemaOf<ArticleFormValues> => {
  return Yup.object().shape({
    title: Yup.string().required('Por favor, insira o título.'),
    author: Yup.string().required(),
    summary: Yup.string(),
    published: Yup.boolean().required(),
    published_at: Yup.date().nullable().required(),
  });
};
