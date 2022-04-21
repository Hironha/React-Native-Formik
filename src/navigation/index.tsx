import React from "react";

import { Stack } from "./Stack";

import Test from "@components/Test";

const Navigation = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Formulário" component={Test} />
    </Stack.Navigator>
  );
};

export default Navigation;
