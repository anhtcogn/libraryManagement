import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

export const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/user/register", values);
      console.log(res)
      if (res && res.data && res.data.success === true) {
        return navigate("/login");
      }
      message.error(res.data.message || "Đã có lỗi xảy ra!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>Đăng ký tài khoản mới</h2>
      <Form
        className="w-1/3 bg-gray-50 px-8 pt-8 rounded-xl"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
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

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phoneNum"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="flex items-center justify-center">
          Đã có tài khoản ? &nbsp;
          <Button
            type="link"
            className="px-0"
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng nhập!
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
//
// import { Button, Form, Input, message } from "antd";
// import axios from "axios";
// import React from "react";
// import { useHistory } from "react-router-dom"; // Changed import
//
// export const Register = () => {
//   const history = useHistory(); // Changed hook
//
//   const onFinish = async (values: any) => { // Added async keyword
//     try {
//       const res = await axios.post("http://localhost:8080/user/register", values); // Await axios request
//       if (res.data.success) {
//         history.push("/login"); // Changed navigate to history.push
//       } else {
//         message.error(res.data.message || "Đã có lỗi xảy ra!"); // Added res.data
//       }
//     } catch (error) {
//       message.error("Đã có lỗi xảy ra!"); // Added error handling
//     }
//   };
//
//   return (
//       <div className="h-screen flex flex-col items-center justify-center">
//         <h2>Đăng ký tài khoản mới</h2>
//         <Form
//             className="w-1/3 bg-gray-50 px-8 pt-8 rounded-xl"
//             name="basic"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 16 }}
//             onFinish={onFinish}
//             autoComplete="off"
//         >
//           <Form.Item
//               label="Username"
//               name="username"
//               rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input />
//           </Form.Item>
//
//           <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password />
//           </Form.Item>
//
//           <Form.Item
//               label="Email"
//               name="email"
//               rules={[{ required: true, message: "Please input your email!" }]}
//           >
//             <Input />
//           </Form.Item>
//
//           <Form.Item
//               label="Address"
//               name="address" // Fixed typo in the name attribute
//               rules={[{ required: true, message: "Please input your address!" }]}
//           >
//             <Input />
//           </Form.Item>
//
//           <Form.Item
//               label="Phone number"
//               name="phoneNum"
//               rules={[
//                 { required: true, message: "Please input your phone number!" },
//               ]}
//           >
//             <Input />
//           </Form.Item>
//
//           <div className="flex items-center justify-center">
//             Đã có tài khoản? &nbsp;
//             <Button
//                 type="link"
//                 className="px-0"
//                 onClick={() => {
//                   history.push("/login"); // Changed navigate to history.push
//                 }}
//             >
//               đăng nhập ngay!
//             </Button>
//           </div>
//
//           <Form.Item className="flex justify-center w-full mt-4">
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//   );
// };