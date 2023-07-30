import { Flex } from "@mantine/core";
import LoginForm from "../components/LoginForm";

const LoginScreen = () => {
  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="row"
      style={{ height: "85vh" }}
    >
      <LoginForm />
    </Flex>
  );
};

export default LoginScreen;
