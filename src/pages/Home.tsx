import { useContext, useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import { Book } from "../components/Book";
import SignInModal from "../components/SignInModal";
import { UserContext } from "../services/context";
import { getAllBooks } from "../services/book";

export const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [library, setLibrary] = useState([]);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    getAllBooks().then((res) => {
      console.log(res);
    });
    
    if (user && user.username) {
      setUser(user);

      getAllBooks().then((res) => {
        console.log(res);
      });
    }
  }, [user]);

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
            <Button danger>Delete</Button>
          </div>
        );
      },
    },
  ];

  const toggleSignInOpen = () => {
    setSignInOpen(!signInOpen);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end items-center mb-4">
        <Button type="link" onClick={toggleSignInOpen}>
          {user && user.username ? user.username : "Sign In"}
        </Button>
        <Button type="primary" onClick={() => setVisible(true)}>
          Add
        </Button>
      </div>
      <Table bordered dataSource={library} columns={columns} />
      <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
        <Book />
      </Modal>
      <SignInModal open={signInOpen} setOpen={toggleSignInOpen} />
    </div>
  );
};
