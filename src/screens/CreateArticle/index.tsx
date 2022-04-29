import React from "react";
import { ScrollView } from "react-native";

import ArticleForm from "@components/ArticleForm";

const CreateArticle = (): JSX.Element => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <ArticleForm />
    </ScrollView>
  );
};

export default CreateArticle;
