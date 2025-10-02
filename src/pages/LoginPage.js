import { useState } from "react";
import { Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { AUTH } from "../utils/api-endpoints";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../redux/authSlice";
import { validateEmail } from "../utils/regex";

const LoginPageNoForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
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
      const response = await axios.post(
        AUTH.Login,
        {
          email: email,
          password: password,
        },
        { headers: { "x-api-key": "reqres-free-v1" } }
      );
      if (response?.data?.token) {
        messageApi.open({
          type: "success",
          content: "Login Successfully Done",
          duration: 3,
        });
        dispatch(setAuthToken(response?.data?.token));
        navigate("/userlist");
        localStorage.setItem("token", response?.data?.token);
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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
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
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              >
                Remember me
              </Checkbox>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPageNoForm;
