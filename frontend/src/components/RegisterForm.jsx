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
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const RegisterForm = () => {
  const [visible1, { toggle: toggle1 }] = useDisclosure(false);
  const [visible2, { toggle: toggle2 }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registeration successfull");
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
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <Input.Wrapper id="userName" withAsterisk label="Name">
          <Input
            id="userName"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input.Wrapper>
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
            id="userPassword"
            visible={visible1}
            onVisibilityChange={toggle1}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper
          id="userConfirmPassword"
          withAsterisk
          label="Confirm password"
        >
          <PasswordInput
            id="userConfirmPassword"
            visible={visible2}
            onVisibilityChange={toggle2}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Input.Wrapper>
        <Button
          style={{ marginTop: 15 }}
          type="submit"
          loading={isLoading}
          disabled={!name || !email || !password || !confirmPassword}
        >
          Sign Up
        </Button>

        <Alert style={{ width: "100%" }}>
          <Flex gap="md" justify="center" align="center" direction="row">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "underline" }}>
              Sign in
            </Link>
          </Flex>
        </Alert>
      </Stack>
    </form>
  );
};

export default RegisterForm;
