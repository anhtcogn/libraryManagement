import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApp } from "../provider/AppProvider";

const { TextArea } = Input;

export const Book = (props) => {
  const { isAdd, record, onCancel } = props;
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { getAllBook } = useApp();

  const isDisable = !isAdd && !isEdit;

  useEffect(() => {
    if (record) {
      form.setFieldsValue(record);
      setSelectedImage(record.image);
    }
  }, []);


  const handleFinish = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (isAdd) {
      formData.append("image", selectedImage);
      const res = await axios.post(
        "http://localhost:8080/book/create",
        formData
      );
      if (res) onCancel();
    }
    if (isEdit) {
      {
        selectedImage && formData.append("image", selectedImage);
      }
      const res = await axios.post(
        "http://localhost:8080/book/update",
        formData
      );
      if (res) onCancel();
    }
    getAllBook();
  };
  const handleSave = async () => {
    const res = await form.validateFields();
    console.log(res)
    if (res?.errorFields) return;
    form.submit();

    // call api post, với đầu vào là res

    setIsEdit(false);
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        name="book"
        onFinish={handleFinish}
        autoComplete="off"
        disabled={isDisable}
      >
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between gap-3">
              <Form.Item
                name="title"
                label="Tiêu đề"
                rules={[{ required: true }]}
                className="flex-1"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="author"
                label="Tác giả"
                rules={[{ required: true }]}
                className="flex-1"
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name="description"
              label="Mô tả về sách"
              className="flex-1"
            >
              <TextArea />
            </Form.Item>

            <div className="flex justify-between gap-3">
              <Form.Item
                name="publishDate"
                label="Ngày phát hành"
                rules={[{ required: true }]}
                className="flex-1"
              >
                <Input />
              </Form.Item>
              <Form.Item name="pageNum" label="Số trang" className="flex-1">
                <Input />
              </Form.Item>
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="category">Thể loại</label>
              <Select id="category" />
              // Call api getCategory, lên antd xem select mẫu
            </div>
          </div>
          <div className="mr-6">
            <label
              htmlFor="img-input"
              style={{
                border: "1px dashed #6e6d7a",
                transition: "all 1s ease-in",
              }}
              className={`${
                selectedImage === null ? "block" : "hidden"
              }  w-[300px] h-[300px] relative flex justify-center items-center rounded-sm cursor-pointer xs:mx-auto img-upload-br`}
            >
              <div className="text-gray-400 font-inter text-xs text-center mt-2">
                Insert
                <p>Picture</p>
              </div>
            </label>
            <input
              className="!hidden"
              id="img-input"
              type="file"
              name="myImage"
              onChange={(e) => {
                setSelectedImage(e.target.files[0]);
              }}
            />
            {!selectedImage && <svg
                onClick={() => {
                  setSelectedImage(null);
                }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                    selectedImage === null ? "hidden" : "block"
                } absolute img-close-btn cursor-pointer`}
            >
              <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="#0D0C22"
                  stroke="white"
                  strokeWidth="2"
              ></circle>{" "}
              <g clipPath="url(#clip0)">
                <path
                    d="M15.7766 8.21582L8.86487 15.1275"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>{" "}
                <path
                    d="M15.7823 15.1347L8.86487 8.21582"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
              </g>{" "}
              <defs>
                <clipPath id="clip0">
                  <rect
                      width="10.3784"
                      height="10.3784"
                      fill="white"
                      transform="translate(7.13513 6.48633)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>}

            {selectedImage ?  <img
                className={`${
                    selectedImage === null ? "hidden" : "block"
                } w-[300px] h-[300px] object-cover mx-auto`}
                alt="not fount"
                src={selectedImage}

            /> : <img src="" alt="Not found"/>}

          </div>
        </div>
      </Form>

      <div className="flex justify-end">
        {isAdd ? (
          <Button
            type="primary"
            htmlType="submit"
            onClick={async () => {
              const res = await form.validateFields();
              if (res?.errorFields) return;
              form.submit();
            }}
          >
            Add
          </Button>
        ) : !isEdit ? (
          <Button type="primary" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSave}
            >
              Save
            </Button>

            <Button
              onClick={() => {
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
