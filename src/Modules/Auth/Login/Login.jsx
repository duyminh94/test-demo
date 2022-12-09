import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Layout } from "antd";
import { UserOutlined, TwitterOutlined, FacebookOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { login } from '../../../Slice/authSlice';
import swal from 'sweetalert2';

const Login = () => {
  const dispatch = useDispatch();
  const { Sider, Content } = Layout
  const { isloading } = useSelector((state) => state.auth)

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
    },
    mode: "onTouched"
  })

  const onSubmit = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      swal.fire({
        text: "Xin chào " + values.email,
        title: "Đăng nhập thành công",
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
      });
    } catch (error) {
      // console.log(error);
      swal.fire({
        text: "Something went wrong!",
        icon: "error",
        title: "Đăng nhập thất bại",
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
                    Login Jira
                  </h3>
                  <div className="d-flex mt-3">
                    <Controller
                      control={control}
                      style={{ width: '100%', minWidth: 400 }}
                      name="email"
                      size="large"
                      placeholder="email"
                      prefix={<UserOutlined />}
                      rules={{
                        required: {
                          value: true,
                          message: "Tài khoản Không Được Để Trống",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <Form.Item label="Tài Khoản"
                          validateStatus={error ? "error" : ""}
                          help={error?.message}>
                          <Input type="text" {...field} />
                        </Form.Item>
                      )}
                    />
                  </div>
                  <div className="d-flex mt-3">
                    <Controller
                      control={control}
                      style={{ width: '100%', minWidth: 300 }}
                      type="password"
                      name="password"
                      size="large"
                      placeholder="password"
                      prefix={<LockOutlined />}
                      rules={{
                        required: {
                          value: true,
                          message: "Vui lòng nhập mật khẩu",
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
                          <Input.Password type="password" {...field} />
                        </Form.Item>
                      )}
                    />

                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Button
                        htmlType="submit"
                        size="large"
                        disabled={isloading}
                        style={{ minWidth: 100, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
                        className="mt-5"
                      >
                        Login
                      </Button>

                    </div>
                    <div className="col-6">
                      <NavLink to="/register">
                        <Button
                          size="large"
                          style={{ minWidth: 100, backgroundColor: 'rgb(102,117,223)', color: '#fff' }}
                          className="mt-5"
                        >
                          Register
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                  <div className="social mt-3 d-flex">
                    <Button type="primary mx-2" style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" icon={<FacebookOutlined />} size={'large'}></Button>
                    <Button type="primary mx-2" shape="circle" icon={<TwitterOutlined />} size={'large'}></Button>
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

export default Login
