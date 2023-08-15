import { memo } from "react";

import { useGlobalStore } from "@/store/global";

import { defaultSetting } from "@/default-setting";

import SlideMenu from "./menus";

const SlideIndex = () => {
  const {
    collapsed,
    // setCollapsed,
  } = useGlobalStore();

  //   useUpdateEffect(() => {
  //     if (!isPC) {
  //       setCollapsed(true);
  //     } else {
  //       setCollapsed(false);
  //     }
  //   }, [isPC]);

  function renderMenu() {
    return <SlideMenu />;
  }

  return (
    <div
      style={{ width: collapsed ? 112 : defaultSetting.slideWidth }}
      className="color-transition top-[80px] fixed box-border left-0 bottom-0 overflow-y-auto px-[16px] bg-primary <lg:hidden"
    >
      {renderMenu()}
    </div>
  );
};

export default memo(SlideIndex);
