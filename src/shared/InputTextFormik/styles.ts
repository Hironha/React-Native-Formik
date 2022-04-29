import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const Container = styled.View`
  padding: 4px;
`;

export const Input = styled.TextInput`
  padding: 2px;
  border-radius: 5px;
  border: 1px black;
`;

export const styles = StyleSheet.create({
  container: {
    padding: 4,
  },

  input: {
    padding: 2,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
  },
});
