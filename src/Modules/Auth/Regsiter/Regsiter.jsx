import React, { useEffect, useState } from 'react'
import { useDispatch} from "react-redux";
import { Button, Form, Input, Layout } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import useRequest from '../../../Hooks/useRequest';
import authAPI from '../../../Services/authAPI';
import { getUsers } from '../../../Slice/userSlice';
import swal from 'sweetalert2';
const Regsiter = () => {
  const dispatch = useDispatch();
  const { Sider, Content } = Layout
  const [{ width, height }, setSize] = useState({
    width: Math.round(window.innerWidth),
    height: Math.round(window.innerHeight),
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: Math.round(window.innerWidth),
        height: Math.round(window.innerHeight),
      });
    };
  }, []);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched"
  })

  const {data: handleRegsiter, isloading} = useRequest(
    (values) => authAPI.regsiter(values),
    {isManual: true}
  )

  const onSubmit = async (values) => {
    try {
      await handleRegsiter(values)
      await dispatch(getUsers()).unwrap()
      swal.fire({
        title: "Đăng Ký thành công",
        icon: "success",
        width: 600,
        padding: '3em',
        color: '#050323',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.gifer.com/origin/6c/6cd9c8156fdf52a6d04eafd731a4356e.gif")
          left top
          no-repeat`
      })
    } catch (error) {
      swal.fire({
        text: "Something went wrong!",
        icon: "error",
        title: "Đăng ký thất bại",
        width: 600,
        padding: '3em',
        color: '#050323',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://cuocsongmenyeu.com/public/upload/images/f49d2eff894210eadfbb907315722d74.gif")
          center right
          no-repeat`,

      });
    }
  }
  return (  
    <div className="container-fluid p-0" style={{ overflow: "hidden", position: "relative" }}>
      <Layout className="row">
        <Sider className="d-md-block d-none" width={width / 2}
          style={{
            height: height,
            backgroundImage: `url(https://picsum.photos/${Math.round(width / 2)}/${height})`,
            backgroundSize: "100%",
            overflow: "hidden"
          }}></Sider>
        <Layout>
          <Content>
            <div className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: height, paddingTop: 150 }}>
              <img style={{ width: 50 }} src="https://seeklogo.com/images/J/jira-logo-C71F8C0324-seeklogo.com.png" alt="" />
              <Form onFinish={handleSubmit(onSubmit)} className="container py-5" style={{ height: window.innerHeight }}>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ height: window.innerHeight }}
                >
                  <h3 className="text-center" style={{ fontWeight: 300, fontSize: 35 }}>
                    Regsiter Jira
                  </h3>
                  <div className="d-flex mt-3 col-6">
                    <Controller
                      name="email"
                      control={control}
                      prefix={<MailOutlined />}
                      rules={{
                        required: {
                          value: true,
                          message: "Email không được để trống",
                        },
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email không đúng định dạng",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          label="Email"
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <Input type="text" {...field} placeholder="Email" />
                        </Form.Item>
                      )}
                    />
                  </div>
                  <div className="d-flex mt-3 col-6">
                    <Controller
                      name="matKhau"
                      control={control}
                      prefix={<LockOutlined />}
                      rules={{
                        required: {
                          value: true,
                          message: "Mật khẩu không được để trống",
                        },
                        minLength: {
                          value: 5,
                          message: "Mật khẩu phải từ 5 đến 10 ký tự",
                        },
                        maxLength: {
                          value: 10,
                          message: "Mật khẩu phải từ 5 đến 10 ký tự",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          label="Mật Khẩu"
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <Input.Password
                            type="password"
                            {...field}
                            placeholder="Mật Khẩu"
                          />
                        </Form.Item>
                      )}
                    />

                  </div>
                  <div className="d-flex mt-3 col-6">
                    <Controller
                      name="phonenumber"
                      control={control}
                      prefix={<PhoneOutlined />}
                      rules={{
                        required: {
                          value: true,
                          message: "Số Điện Thoại Không Được Để Trống",
                        },
                        pattern: {
                          value:
                            /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                          message: "Điện thoại không đúng định dạng",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          label="Điện Thoại"
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <Input
                            type="phonenumber"
                            {...field}
                            placeholder="Số Điện Thoại"
                          />
                        </Form.Item>
                      )}
                    />

                  </div>
                  <div className="d-flex mt-3 col-6">
                    <Controller
                      name="name"
                      control={control}
                      prefix={<UserOutlined />}
                      rules={{
                        required: {
                          value: true,
                          message: "Họ Tên Không Được Để Trống",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item
                          label="Họ Tên"
                          validateStatus={error ? "error" : ""}
                          help={error?.message}
                        >
                          <Input
                            type="name"
                            {...field}
                            placeholder="Họ Tên"
                          />
                        </Form.Item>
                      )}
                    />

                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Button
                        htmlType="submit"
                        disabled={isloading}
                        size="large"
                        style={{ minWidth: 90, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
                        className="mt-5"
                      >
                        Regsiter
                      </Button>

                    </div>
                    <div className="col-6">
                      <NavLink to="/login" type='primary'>
                        <Button
                          size="large"
                          style={{ minWidth: 90, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
                          className="mt-5"
                        >
                          Login
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );

}

export default Regsiter