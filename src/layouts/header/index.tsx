import { memo } from "react";
import { defaultSetting } from "@/default-setting";
import { IconBuguang } from "@/icons/buguang";
import { MenuOutlined } from "@ant-design/icons";
import { useGlobalStore } from "@/store/global";

const Header = () => {
  const { collapsed, setCollapsed } = useGlobalStore();

  return (
    <div
      style={{ zIndex: 998 }}
      className="color-transition h-[80px] flex basis-[48px] items-center px-0 gap-[16px] fixed top-0 right-0 left-0 bg-primary"
    >
      <div
        style={{ width: defaultSetting.slideWidth }}
        className="<lg:hidden flex justify-between items-center"
      >
        <div className="flex items-center gap-[4px] text-[20px] px-[24px] pr-0">
          <IconBuguang className="text-blue-500" />
          <h1 className="text-primary font-bold text-[22px]">fluxy-admin</h1>
        </div>
        <div
          className="btn-icon"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          <MenuOutlined />
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
