import React, { useState } from "react";
import { Button, Modal, Table } from "antd";
import { Book } from "../components/Book";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

export const Home = () => {
  const [visible, setVisible] = useState(false);

  const columns: any = [
    {
      title: "STT",
      width: 50,
      align: "center",
      render: (text, record, index: number) => `${index + 1}`,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Ngày xuất bản",
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: "Số trang",
      dataIndex: "pageNum",
      key: "pageNum",
    },
    {
      width: 200,
      render: () => {
        return (
          <div className="flex justify-center gap-2">
            <Button type="primary">Edit</Button>
            <Button type="primary">Delete</Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => setVisible(true)}>
          Add
        </Button>
      </div>
      <Table bordered dataSource={dataSource} columns={columns} />
      <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
        <Book />
      </Modal>
    </div>
  );
};
