import React, { useEffect, useState } from "react";
import { Button, Modal, Table, message } from "antd";
import { Book } from "../components/Book";
import { useApp } from "../provider/AppProvider";
import { useNavigate } from "react-router";
import axios from "axios";

const dataSource = [
  {
    id: 1,
    title: "Cay cam ngot cua toi update",
    author: "Jose Mauro",
    category: "Tieu thuyet",
    publishDate: "11/08/2019",
    pageNum: 234,
    description: "Duoc giai thuong",
    image: "https://anhtcogn.blob.core.windows.net/anhtcogn/a1.jpg",
  },
  {
    id: 2,
    title: "Cay cam ngot cua toi",
    author: "Jose Mauro",
    category: "Tieu thuyet",
    publishDate: "11/08/2019",
    pageNum: 234,
    description: "Duoc giai thuong",
    image: null,
  },
  {
    id: 3,
    title: "Cay cam ngot cua toi",
    author: "Jose Mauro",
    category: "Tieu thuyet",
    publishDate: "11/08/2019",
    pageNum: 234,
    description: "Duoc giai thuong",
    image: "https://anhtcogn.blob.core.windows.net/anhtcogn/a1.jpg",
  },
];

export const Home = () => {
  const { getAllBook } = useApp();
  const [modal, setModal] = useState({
    visible: false,
    isAdd: false,
    record: null,
  });

  const navigate = useNavigate();

  const {
    user: { isLogin },
    books,
  } = useApp();

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:8080/book/delete?id=${id}`
    );
    if (res.data.success) {
      getAllBook();
    }
    if (!res.data.success)
      message.error(res.data.message || "Đã có lỗi xảy ra");

  };
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
      render: (text, record) => {
        return (
          <div className="flex justify-center gap-2">
            {isLogin && (
              <>
                <Button
                  type="primary"
                  onClick={() =>
                    setModal({
                      visible: true,
                      isAdd: false,
                      record,
                    })
                  }
                >
                  View
                </Button>
                <Button type="primary" onClick={() => handleDelete(record.id)}>
                  Delete
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        {isLogin ? (
          <Button
            type="primary"
            onClick={() =>
              setModal({ record: null, visible: true, isAdd: true })
            }
          >
            Add
          </Button>
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        )}
      </div>
      <Table bordered dataSource={books} columns={columns} rowKey={"id"} />
      <Modal
        open={modal.visible}
        onCancel={() => setModal({ ...modal, visible: false })}
        footer={null}
        destroyOnClose
        width="45%"
      >
        <Book
          isAdd={modal.isAdd}
          record={modal.record}
          onCancel={() => setModal({ ...modal, visible: false })}
        />
      </Modal>
    </div>
  );
};
