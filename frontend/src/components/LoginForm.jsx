import {
  Alert,
  Button,
  Flex,
  Input,
  PasswordInput,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <form onSubmit={handleSubmit} style={{ padding: 40 }} className="border-md">
      <Stack spacing="md" style={{ width: "350px" }}>
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <Input.Wrapper id="userEmail" withAsterisk label="Email">
          <Input
            id="userEmail"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper id="userPassword" withAsterisk label="Password">
          <PasswordInput
            visible={visible}
            onVisibilityChange={toggle}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Input.Wrapper>
        <Button
          style={{ marginTop: 15 }}
          type="submit"
          disabled={!email || !password}
          loading={isLoading}
        >
          Sign In
        </Button>

        <Alert style={{ width: "100%" }}>
          <Flex gap="md" justify="center" align="center" direction="row">
            <p>New user?</p>
            <Link to="/register" style={{ textDecoration: "underline" }}>
              Register
            </Link>
          </Flex>
        </Alert>
      </Stack>
    </form>
  );
};

export default LoginForm;
