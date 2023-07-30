import { Flex } from "@mantine/core";
import RegisterForm from "../components/RegisterForm";

const RegisterScreen = () => {
  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="row"
      style={{ height: "85vh" }}
    >
      <RegisterForm />
    </Flex>
  );
};

export default RegisterScreen;
