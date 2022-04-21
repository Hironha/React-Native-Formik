export type ArticleFormValues = {
  title: string;
  author: string;
  summary: string | undefined;
  published: boolean;
  published_at: Date | null;
};

export const getInitialValues = (): ArticleFormValues => {
  return {
    author: "",
    summary: "",
    title: "",
    published: true,
    published_at: null,
  };
};
