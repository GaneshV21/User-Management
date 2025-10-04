import { useState } from "react";
import { Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { AUTH } from "../utils/api-endpoints";
import { validateEmail } from "../utils/regex";
import { Link } from "react-router-dom";

const SignupPageForm = () => {
  const defaultState = {
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  };
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const validatePassword = (password) => {
    if (!password) {
      return "Please input your Password!";
    }
    return "";
  };

  const validateName = (name) => {
    if (!name) {
      return "Please input your Name!";
    }
    return "";
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post(AUTH.Signup, {
        name: data?.name?.value,
        email: data?.email?.value,
        password: data?.password?.value,
      });
      if (response?.data?.data) {
        messageApi.open({
          type: "success",
          content: response?.data?.message,
          duration: 3,
        });
        setData(defaultState);
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.message || "Signup Error",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleData = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    let errorMessage = "";
    if (key === "email") {
      errorMessage = validateEmail(value);
    } else if (key === "password") {
      errorMessage = validatePassword(value);
    } else if (key === "name") {
      errorMessage = validateName(value);
    }
    setData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        value: value,
        error: errorMessage,
      },
    }));
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white px-8 pb-8 rounded-lg shadow-md w-full max-w-sm">
          <p className="text-center text-2xl font-semibold text-gray-800 mt-6 mb-4">
            Signup Page
          </p>
          <div className="space-y-4">
            <div>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                size="large"
                name="name"
                className={`rounded-md ${
                  data?.name?.error ? "border-red-500" : ""
                }`}
                value={data?.name?.value}
                onChange={handleData}
              />
              {data?.name?.error && (
                <div className="text-red-500 text-sm mt-1">
                  {data?.name?.error}
                </div>
              )}
            </div>

            <div>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                size="large"
                name="email"
                className={`rounded-md ${
                  data?.email?.error ? "border-red-500" : ""
                }`}
                value={data?.email?.value}
                onChange={handleData}
              />
              {data?.email?.error && (
                <div className="text-red-500 text-sm mt-1">
                  {data?.email?.error}
                </div>
              )}
            </div>

            <div>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="*********"
                size="large"
                name="password"
                className={`rounded-md ${
                  data?.password?.error ? "border-red-500" : ""
                }`}
                value={data?.password?.value}
                onChange={handleData}
              />
              {data?.password?.error && (
                <div className="text-red-500 text-sm mt-1">
                  {data?.password?.error}
                </div>
              )}
            </div>

            <div className="mb-0">
              <Button
                type="primary"
                className={`w-full h-10 rounded-md bg-blue-500 text-white  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
    disabled:bg-blue-500 disabled:text-white disabled:opacity-100 disabled:cursor-not-allowed`}
                loading={loading}
                size="large"
                disabled={
                  data?.name?.error ||
                  data?.email?.error ||
                  data?.password?.error ||
                  !data?.name?.value ||
                  !data?.email?.value ||
                  !data?.password?.value
                }
                onClick={handleSignup}
              >
                Register
              </Button>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPageForm;
