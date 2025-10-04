import { useState } from "react";
import { Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { AUTH } from "../utils/api-endpoints";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken, setUser } from "../redux/authSlice";
import { validateEmail } from "../utils/regex";

const LoginPageNoForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (!password) {
      return "Please input your Password!";
    }
    return "";
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    const emailErrMsg = validateEmail(email);
    const passwordErrMsg = validatePassword(password);

    if (emailErrMsg || passwordErrMsg) {
      setEmailError(emailErrMsg);
      setPasswordError(passwordErrMsg);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(AUTH.Login, {
        email: email,
        password: password,
      });
      if (response?.data?.data) {
        messageApi.open({
          type: "success",
          content: response?.data?.message,
          duration: 3,
        });
        dispatch(setAuthToken(response?.data?.data?.token));
        dispatch(setUser(JSON.stringify(response?.data?.data)));
        navigate("/userlist");
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem("user", JSON.stringify(response?.data?.data));
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.error || "Invalid Credentials",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white px-8 pb-8 rounded-lg shadow-md w-full max-w-sm">
          <p className="text-center text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Login Page
          </p>
          <div className="space-y-4">
            <div>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
                className={`rounded-md ${emailError ? "border-red-500" : ""}`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
              />
              {emailError && (
                <div className="text-red-500 text-sm mt-1">{emailError}</div>
              )}
            </div>

            <div>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="*********"
                size="large"
                className={`rounded-md ${
                  passwordError ? "border-red-500" : ""
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <div className="text-red-500 text-sm mt-1">{passwordError}</div>
              )}
            </div>

            <div className="mb-0">
              <Button
                type="primary"
                className="w-full h-10 rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                loading={loading}
                size="large"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPageNoForm;
