import { Button, Input, PasswordInput, Stack } from "@mantine/core";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
const UpdateForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [visible1, { toggle: toggle1 }] = useDisclosure(false);
  const [visible2, { toggle: toggle2 }] = useDisclosure(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateUser({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile update successfull");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  return (
    <form onSubmit={handleSubmit} style={{ padding: 40 }} className="border-md">
      <Stack spacing="md" style={{ width: "350px" }}>
        <h2 style={{ textAlign: "center" }}>Update profile</h2>
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
          Update
        </Button>
      </Stack>
    </form>
  );
};

export default UpdateForm;
