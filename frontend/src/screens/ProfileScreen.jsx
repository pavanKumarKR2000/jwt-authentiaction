import { Flex } from "@mantine/core";
import UpdateForm from "../components/UpdateForm";

const ProfileScreen = () => {
  return (
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="row"
      style={{ height: "85vh" }}
    >
      <UpdateForm />
    </Flex>
  );
};

export default ProfileScreen;
