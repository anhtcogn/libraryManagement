import { useContext, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Typography } from "antd";
import {
  CloseOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { login } from "../services/user";
import { UserContext } from "../services/context";
import { IUser } from "../Types/user";

const SignInModal = (props) => {
  const { user, setUser } = useContext(UserContext);

  const { open, setOpen } = props;
  const [title, setTitle] = useState("Sign In");
  const [authForm] = Form.useForm();

  const closeModal = () => {
    setOpen(false);
    authForm.resetFields();
  };

  const handleLogin = async (values) => {
    const res = await login(values);
    console.log(res);
    if (res && res.status === 200 && res.data?.accessToken) {
      const _user: IUser = {
        username: res.data?.username,
        accessToken: res.data?.accessToken,
        email: null,
        address: null,
        phoneNum: null,
      };
      setUser(_user);
      closeModal();
    }
  };

  const handleRegister = async (values) => {
    console.log(values);
  };

  const onFinish = (values: any) => {
    if (title === "Sign In") handleLogin(values);
    else handleRegister(values);
  };

  const toggleTitle = () => {
    if (title === "Sign In") setTitle("Register");
    else setTitle("Sign In");
  };

  return (
    <Modal
      open={open}
      onCancel={closeModal}
      footer={false}
      closable={false}
      title={
        <div className="flex justify-between">
          <Typography.Title level={2} className="pb-4">
            {title}
          </Typography.Title>
          <Button
            value="large"
            shape="circle"
            icon={<CloseOutlined />}
            onClick={closeModal}
          />
        </div>
      }
    >
      <Form
        name="auth_form"
        className="auth_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={authForm}
      >
        {title === "Sign In" ? (
          <>
            {" "}
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your Confirm Password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your Email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input prefix={<HomeOutlined />} placeholder="Address" />
            </Form.Item>
            <Form.Item
              name="phoneNum"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
                {
                  type: "number",
                  message: "The input is not valid Phone Number!",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <div className="flex items-center space-x-4">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
            {title === "Register" && <Button htmlType="reset">Reset</Button>}
            <Button type="link" onClick={toggleTitle}>
              {title === "Sign In" ? "Register" : "Sign In"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignInModal;
