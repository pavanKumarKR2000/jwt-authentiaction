import { Button, Flex } from "@mantine/core";
import { LogIn, LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <nav>
      <Flex
        mih={50}
        bg="#BFDBFE"
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        style={{ paddingBlock: 5, paddingInline: 15 }}
      >
        <Link to="/">
          <h1 style={{ color: "black" }}>MERN Auth</h1>
        </Link>
        <Flex
          mih={50}
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
        >
          {userInfo ? (
            <>
              <h4>{userInfo.name}</h4>
              <Link to="/profile">
                <Button
                  leftIcon={<User size="20" />}
                  color="blue"
                  variant="filled"
                >
                  profile
                </Button>
              </Link>

              <Button
                leftIcon={<LogOut size="20" />}
                color="red"
                variant="filled"
                onClick={handleLogout}
                loading={isLoading}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Header;
