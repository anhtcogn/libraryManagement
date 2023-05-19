import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { useApp } from "../provider/AppProvider";

export const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useApp();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>Đăng nhập</h2>
      <Form
        className="w-1/3 bg-gray-50 px-2 pt-8 rounded-xl"
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex items-center justify-center">
          Chưa có tài khoản ? &nbsp;
          <Button
            type="link"
            className="px-0"
            onClick={() => {
              navigate("/register");
            }}
          >
            đăng ký ngay!
          </Button>
        </div>

        <Form.Item className="flex justify-center w-full mt-4">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
