import { Button, Flex } from "@mantine/core";
import { LogIn } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: 40 }} className="border-md">
      <Flex
        mih={50}
        gap="lg"
        justify="center"
        align="center"
        direction="column"
      >
        <h2>MERN Authentication</h2>
        <p>
          This is a boilerplate for MERN authentication that stores a JWT in an
          HTTP-Only cookie. It also uses Redux Toolkit and the Mantine ui
          library
        </p>
        {!userInfo && (
          <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="row"
          >
            <Link to="/login">
              <Button
                leftIcon={<LogIn size="20" />}
                color="blue"
                variant="filled"
              >
                Sign In
              </Button>
            </Link>
            <Link to="register">
              <Button
                leftIcon={<LogIn size="20" />}
                color="green"
                variant="filled"
              >
                Sign Up
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Hero;
