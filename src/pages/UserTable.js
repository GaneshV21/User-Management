import { useState, useEffect } from "react";
import { Table, Button, Space, Avatar, Pagination, Spin } from "antd";

const UserTable = ({
  userData,
  loading,
  setModal,
  setKeys,
  setData,
  setDeleteModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [displayData, setDisplayData] = useState([]);

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

  useEffect(() => {
    if (userData && userData.length > 0) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      setDisplayData(userData.slice(startIndex, endIndex));
    } else {
      setDisplayData([]);
    }
  }, [userData, currentPage, pageSize]);
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",

      render: (text) => <Avatar src={text} size="large" />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href={`mailto:${text}`}>{text}</a>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            className="bg-[#1890ff] border border-[#1890ff]"
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: 150,
    },
  ];

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    console.log(`Page: ${page}, PageSize: ${pageSize}`);
  };

  return (
    <div className="w-full">
      <Table
        size="small"
        dataSource={displayData}
        columns={columns}
        pagination={false}
        rowKey="id"
        loading={loading}
        className="mt-0 px-10"
        locale={{
          emptyText:
            !loading && userData?.length === 0 ? (
              "No user data available."
            ) : (
              <Spin tip="Loading users..." />
            ),
        }}
      />

      <div className="flex justify-end mt-4 ">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={userData ? userData.length : 0}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default UserTable;
