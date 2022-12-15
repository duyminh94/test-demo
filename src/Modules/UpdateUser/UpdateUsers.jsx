import React, { useEffect } from 'react'
import { Form, Button, Input } from 'antd';
import { closeModalAction } from "../../Slice/action/modalAction"
import { useDispatch, useSelector } from 'react-redux';
import {
  UserOutlined,
  KeyOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import Swal from 'sweetalert2';
import { updateUser } from '../../Slice/userSlice';


const UpdateUser = () => {
 
  
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { userdetail } = useSelector((state) => state.user)
  


  // useEffect(() => {
  //   dispatch(getUsers())
  //   // eslint-disable-next-line
  // }, [])

  // useEffect(() => {
  //   dispatch(getUserDetail(users))
  //   // eslint-disable-next-line
  // }, [users])
  // console.log(users);

  useEffect(() => {
    if(!userdetail) return
    form.setFieldValue('id',userdetail?.userId)
    form.setFieldValue('email', userdetail?.email)
    form.setFieldValue("name", userdetail?.name)
    form.setFieldValue('phoneNumber',userdetail?.phoneNumber)
    // eslint-disable-next-line
  }, [userdetail])


  const handleSubmit = async (values) => {
    // const updateUser = { ...values, id: userEdit.userId.toString() }
    try {
      await dispatch(updateUser(values)).unwrap()
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })

      dispatch(closeModalAction())
    } catch (error) {
      Swal.fire({

        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }
  return (
    <>

      <Form
        width={window.innerWidth / 2}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          email: "",
          passWord: "",
          name: "",
          phoneNumber: "",
          id: "",
        }}
      >
        <Form.Item
          label="User ID"
          name="id"
          validateTrigger={["onChange"]}
          rules={[
            {
              required: true,
              message: "Please input your id!",
            },
          ]}
        >
          <Input
            size="large"
            style={{ minWidth: 350 }}
            prefix={<IdcardOutlined />}
            disabled
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          validateTrigger={["onChange"]}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is invalid",
            },
          ]}
        >
          <Input
            size="large"
            style={{ minWidth: 350 }}
            prefix={<MailOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="passWord"
          validateTrigger={["onChange"]}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            size="large"
            style={{ minWidth: 350 }}
            prefix={<KeyOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          validateTrigger={["onChange"]}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
            {
              pattern:
                "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
              message: "Name is invalid",
            },
          ]}
        >
          <Input
            size="large"
            style={{ minWidth: 350 }}
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          validateTrigger={["onChange"]}
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            size="large"
            style={{ minWidth: 350 }}
            prefix={<PhoneOutlined />}
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => {
            return (
              <Button
                style={{ backgroundColor: "#065fd4", color: "white" }}
                htmlType="submit"
                block
                disabled={
                  !form.isFieldsTouched() ||
                  form.getFieldsError().some((ele) => ele.errors.length > 0)
                }
              >
                Update user
              </Button>
            );
          }}
        </Form.Item>
      </Form>

    </>
  )
}


export default UpdateUser