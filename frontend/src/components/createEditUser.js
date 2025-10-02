import { Button, Input, message, Modal } from "antd";
import { useState } from "react";
import { validateEmail } from "../utils/regex";
import axios from "axios";
import { USER } from "../utils/api-endpoints";
import { useSelector } from "react-redux";

function CreateEditUser({
  modal,
  setModal,
  data,
  setData,
  keys,
  defaultState,
  handleUser,
}) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const token = useSelector((state) => state.auth.token);
  function handleInputChange(e) {
    const { name, value } = e.target;
    let isError = false;
    let errorMessage = "";

    if (name === "first_name" || name === "last_name") {
      if (!value.trim()) {
        isError = true;
        errorMessage = "Please enter a valid name";
      }
      setData((state) => ({
        ...state,
        [name]: {
          value: value,
          isError: isError,
          errorMessage: errorMessage,
        },
      }));
    } else if (name === "email") {
      let validationMessage = validateEmail(value);
      if (validationMessage) {
        isError = true;
        errorMessage = validationMessage;
      }

      setData((state) => ({
        ...state,
        [name]: {
          value: value,
          isError: isError,
          errorMessage: errorMessage,
        },
      }));
    } else {
      if (!value.trim()) {
        isError = true;
        errorMessage = `please enter the valid url link`;
      }

      setData((state) => ({
        ...state,
        [name]: {
          value: value,
          isError: isError,
          errorMessage: errorMessage,
        },
      }));
    }
  }

  function handleCancel() {
    setModal(false);
    setData(defaultState);
  }

  async function handleCreateUser() {
    setLoading(true);
    try {
      const payload = {
        first_name: data.first_name.value,
        last_name: data.last_name.value,
        email: data.email.value,
        profile_link: data.profile_link.value,
      };
      let response = await axios.post(USER.create, payload, {
        headers: { "X-Auth-Header": token },
      });
      if (response?.data?.data) {
        messageApi.open({
          type: "success",
          content: response?.data?.message,
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message || "error in create user",
        duration: 3,
      });
    } finally {
      setLoading(false);
      handleCancel();
      handleUser();
    }
  }
  async function handleUpdateUser() {
    setLoading(true);
    try {
      const payload = {
        first_name: data.first_name.value,
        last_name: data.last_name.value,
        email: data.email.value,
        profile_link: data.profile_link.value,
      };
      await axios.put(`${USER.update(data.id)}`, payload, {
        headers: { "X-Auth-Header": token },
      });

      messageApi.open({
        type: "success",
        content: "User Updated Successfully",
        duration: 3,
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.message || "error in Update user",
        duration: 3,
      });
    } finally {
      setLoading(false);
      handleCancel();
      handleUser();
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        width="40%"
        title={
          <div className="pb-2 font-semibold text-gray-700 text-lg">
            {keys === "create" ? "Create New User" : "Edit User"}
          </div>
        }
        maskClosable={false}
        open={modal}
        onCancel={handleCancel}
        footer={
          <>
            <Button className="w-[70px]" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              loading={loading}
              disabled={
                !data.first_name.value ||
                !data.last_name.value ||
                !data.email.value ||
                !data.profile_link.value ||
                data.first_name.error ||
                data.last_name.error ||
                data.email.error ||
                data.profile_link.error
              }
              onClick={keys === "create" ? handleCreateUser : handleUpdateUser}
              type="primary"
              className="rounded-md bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span>
              <span className="text-red-500">*</span>
              First Name
            </span>
            <Input
              placeholder="Please enter first name "
              onChange={handleInputChange}
              name="first_name"
              value={data?.first_name?.value || ""}
              status={data?.first_name?.isError ? "error" : ""}
            />
            {data?.first_name?.isError && (
              <p className="text-red-500 text-sm">
                {data?.first_name?.errorMessage}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span>
              <span className="text-red-500">*</span>
              Last Name
            </span>
            <Input
              placeholder="Please enter last name "
              onChange={handleInputChange}
              name="last_name"
              value={data?.last_name?.value || ""}
              status={data?.last_name?.isError ? "error" : ""}
            />
            {data?.last_name?.isError && (
              <p className="text-red-500 text-sm">
                {data?.last_name?.errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span>
              <span className="text-red-500">*</span>
              Email
            </span>
            <Input
              placeholder="Please enter email "
              onChange={handleInputChange}
              name="email"
              value={data?.email?.value || ""}
              status={data?.email?.isError ? "error" : ""}
            />
            {data?.email?.isError && (
              <p className="text-red-500 text-sm">
                {data?.email?.errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span>
              <span className="text-red-500">*</span>
              Profile Picture Link
            </span>
            <Input
              placeholder="Please enter profile image link "
              onChange={handleInputChange}
              name="profile_link"
              value={data?.profile_link?.value || ""}
              status={data?.profile_link?.isError ? "error" : ""}
            />
            {data?.profile_link?.isError && (
              <p className="text-red-500 text-sm">
                {data?.profile_link?.errorMessage}
              </p>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateEditUser;
