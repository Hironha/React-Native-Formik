import React from "react";

import { Stack } from "./Stack";

import CreateArticle from "@screens/CreateArticle";

type Screen = {
  name: string;
  component: React.FC;
};

const SCREENS: Screen[] = [
  {
    name: "Criar Artigo",
    component: CreateArticle,
  },
];

const Navigation = (): JSX.Element => {
  return (
    <Stack.Navigator>
      {SCREENS.map((screen) => (
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
};

export default Navigation;
