import { Flex } from "@mantine/core";
import Hero from "../components/Hero";

const HomeScreen = () => {
  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="row"
      style={{ height: "90vh", width: "100vw" }}
    >
      <Hero />
    </Flex>
  );
};

export default HomeScreen;
