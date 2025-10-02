import { useEffect, useState } from "react";
import { Button, Input, message, Tabs, Typography } from "antd";
import { TableOutlined } from "@ant-design/icons";
import UserTable from "../pages/UserTable";
import UserGrid from "../pages/UserGrid";
import axios from "axios";
import { USER } from "../utils/api-endpoints";
import CreateEditUser from "../components/createEditUser";
import DeleteUser from "../components/deleteUser";
import { TfiMenuAlt } from "react-icons/tfi";

const UserList = () => {
  const [viewMode, setViewMode] = useState("table");
  const [userData, setUserData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [keys, setKeys] = useState("");
  const defaultState = {
    id: "",
    first_name: { value: "", isError: false, errorMessage: "" },
    last_name: { value: "", isError: false, errorMessage: "" },
    email: { value: "", isError: false, errorMessage: "" },
    avatar: { value: "", isError: false, errorMessage: "" },
  };
  const [data, setData] = useState(defaultState);

  const handleSearch = (value) => {
    if (value) {
      const filtered = userData.filter((user) => {
        return (
          user.first_name.toLowerCase().includes(value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(value.toLowerCase())
        );
      });
      setUserData(filtered);
    } else {
      handleUser();
    }
  };

  const handleCreate = () => {
    setModal(true);
    setKeys("create");
    setData(defaultState);
  };

  const handleUser = async function () {
    setLoading(true);
    try {
      const response = await axios.get(USER.User, {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      setUserData(response.data.data);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: error.response.data.error || "User list error",
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };
  const tabItems = [
    {
      key: "table",
      label: (
        <>
          <TableOutlined /> Table
        </>
      ),
      children: (
        <UserTable
          userData={userData}
          loading={loading}
          setModal={setModal}
          setKeys={setKeys}
          setData={setData}
          defaultState={defaultState}
          setDeleteModal={setDeleteModal}
        />
      ),
    },
    {
      key: "card",
      label: (
        <span className="flex items-center gap-1">
          <TfiMenuAlt />
          Card
        </span>
      ),
      children: (
        <UserGrid
          userData={userData}
          loading={loading}
          setModal={setModal}
          setData={setData}
          defaultState={defaultState}
          setKeys={setKeys}
          setDeleteModal={setDeleteModal}
        />
      ),
    },
  ];

  useEffect(() => {
    handleUser();
  }, []);

  return (
    <>
      {contextHolder}
      <div className=" bg-gray-100 px-10 py-3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <Typography className="my-0 text-lg font-bold">Users</Typography>
            <div className="flex gap-5">
              <Input.Search
                placeholder="input search text"
                onSearch={handleSearch}
                style={{ width: 200 }}
                allowClear
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 "
                type="primary"
                onClick={handleCreate}
              >
                Create User
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <div>
              <Tabs
                activeKey={viewMode}
                onChange={setViewMode}
                items={tabItems}
                size="small"
                type="card"
              />
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <CreateEditUser
          modal={modal}
          setModal={setModal}
          data={data}
          setData={setData}
          keys={keys}
          handleUser={handleUser}
        />
      )}
      {deleteModal && (
        <DeleteUser
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          data={data}
          handleUser={handleUser}
        />
      )}
    </>
  );
};

export default UserList;
