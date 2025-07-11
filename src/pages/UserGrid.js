import { Card, Avatar, Typography, Button, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { GrEdit } from "react-icons/gr";

const { Text } = Typography;

const UserGrid = ({
  userData,
  loading,
  setModal,
  setKeys,
  setData,
  setDeleteModal,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-[300px]">
        <Spin size="large" tip="Loading users..." />
      </div>
    );
  }

  const handleEdit = (record) => {
    setModal(true);
    setKeys("edit");
    setData({
      id: record.id,
      first_name: { value: record.first_name },
      last_name: { value: record.last_name },
      email: { value: record.email },
      avatar: { value: record.avatar },
    });
  };

  const handleDelete = (record) => {
    setDeleteModal(true);
    setData({ id: record.id });
  };

  return (
    <div className="p-4  bg-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-5">
        {userData.map((user) => (
          <Card
            key={user.id}
            hoverable
            className="w-full relative overflow-hidden text-center"
          >
            <div className="mb-4 flex justify-center">
              <Avatar size={96} src={user.avatar} />{" "}
            </div>

            <Typography className="text-xl mb-1 font-semibold">
              {`${user.first_name} ${user.last_name}`}
            </Typography>

            <Typography type="secondary" className="block text-base">
              {user.email}
            </Typography>

            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center space-x-4 opacity-0 hover:opacity-100">
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={<GrEdit />}
                className="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600  "
                onClick={() => handleEdit(user)}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                size="large"
                danger
                onClick={() => handleDelete(user)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserGrid;
