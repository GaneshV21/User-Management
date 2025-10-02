import { Button, message, Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { USER } from "../utils/api-endpoints";
import { useSelector } from "react-redux";

function DeleteUser({ deleteModal, setDeleteModal, data, handleUser }) {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  async function handleDeleteUser() {
    setLoading(true);
    try {
      let response = await axios.delete(`${USER.delete(data.id)}`, {
        headers: { "X-Auth-Header": token },
      });
      if (response.data) message.success(response?.data?.message);
    } catch (error) {
      message.error(error?.response?.data?.error || "Error in delete user");
    } finally {
      setLoading(false);
      handleCancel();
      handleUser();
    }
  }

  function handleCancel() {
    setDeleteModal(false);
  }

  return (
    <Modal
      width="40%"
      title={
        <div className="pb-2 font-semibold text-gray-700 text-lg">
          Delete User
        </div>
      }
      maskClosable={false}
      open={deleteModal}
      onCancel={handleCancel}
      footer={
        <>
          <Button className="w-[70px]" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            loading={loading}
            onClick={handleDeleteUser}
            type="primary"
            danger
          >
            Delete
          </Button>
        </>
      }
    >
      Are you sure to delete the user?
    </Modal>
  );
}

export default DeleteUser;
