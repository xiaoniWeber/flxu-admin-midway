import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import Slide from "./slide";
import Content from "./content";

const BasicLayout = () => {
  return (
    // <Layout>
    //   <Sider trigger={null} collapsible collapsed={collapsed}>
    //     <div className="demo-logo-vertical" />
    //     <Menu
    //       theme="dark"
    //       mode="inline"
    //       defaultSelectedKeys={["1"]}
    //       items={[
    //         {
    //           key: "1",
    //           icon: <UserOutlined />,
    //           label: "nav 1",
    //         },
    //         {
    //           key: "2",
    //           icon: <VideoCameraOutlined />,
    //           label: "nav 2",
    //         },
    //         {
    //           key: "3",
    //           icon: <UploadOutlined />,
    //           label: "nav 3",
    //         },
    //       ]}
    //     />
    //   </Sider>
    //   <Layout>
    //     <Header style={{ padding: 0, background: colorBgContainer }}>
    //       <Button
    //         type="text"
    //         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    //         onClick={() => setCollapsed(!collapsed)}
    //         style={{
    //           fontSize: "16px",
    //           width: 64,
    //           height: 64,
    //         }}
    //       />
    //     </Header>
    //     <Content
    //       style={{
    //         margin: "24px 16px",
    //         padding: 24,
    //         minHeight: 280,
    //         background: colorBgContainer,
    //       }}
    //     >
    //       Content
    //     </Content>
    //   </Layout>
    // </Layout>
    <div className="bg-primary overflow-hidden">
      <Header />
      <Slide />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};
export default BasicLayout;
