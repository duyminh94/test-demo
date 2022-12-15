import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';



const AuthLayout = () => {
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
                            style={{ height: height, paddingTop: 50 }}>
                            <img style={{ width: 50 }} src="https://seeklogo.com/images/J/jira-logo-C71F8C0324-seeklogo.com.png" alt="" />
                            <h2> Welcome to Jira</h2>
                            <h6>To access, please login</h6>
                            <div className='btn btn-info text-success' >
                                <Link to="login" style={{textDecoration: "none"}}>
                                    Login
                                </Link>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default AuthLayout