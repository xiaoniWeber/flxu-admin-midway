import { Menu } from "antd";

import { useGlobalStore } from "@/store/global";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const SlideMenu = () => {
  const { collapsed } = useGlobalStore();

  const menuData = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "nav 1",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "nav 2",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];

  return (
    <Menu
      className="bg-primary color-transition"
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={menuData}
      inlineCollapsed={collapsed}
    />
  );
};

export default SlideMenu;
