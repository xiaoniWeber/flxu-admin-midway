import { ConfigProvider, ThemeConfig, theme, App as AntdApp } from "antd";
import Router from "./router";
import { useGlobalStore } from "./store/global";
import { useMemo, useEffect } from "react";

function App() {
  const { darkMode } = useGlobalStore();
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
  }, [darkMode]);
  const curTheme: ThemeConfig = useMemo(() => {
    if (darkMode) {
      return {
        token: {
          colorPrimary: "rgb(124, 77, 255)",
          colorBgBase: "rgb(17, 25, 54)",
          colorBgContainer: "rgb(26, 34, 63)",
          colorBorder: "rgba(189, 200, 240, 0.157)",
          colorBgTextHover: "rgba(124, 77, 255, 0.082)",
          colorTextHover: "rgba(124, 77, 255, 0.082)",
          controlItemBgActive: "rgba(33, 150, 243, 0.16)",
          colorBgElevated: "rgb(33, 41, 70)",
        },
        algorithm: theme.darkAlgorithm,
      };
    } else {
      return {
        token: {
          colorPrimary: "rgb(124, 77, 255)",
        },
      };
    }
  }, [darkMode]);
  return (
    <ConfigProvider theme={curTheme} componentSize="large">
      <AntdApp>
        <Router />
      </AntdApp>
    </ConfigProvider>
  );
}
export default App;
