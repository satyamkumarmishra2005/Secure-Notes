import React from "react";
import { IoIosPartlySunny } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { MdOutlineSecurity } from "react-icons/md";
import { SiPythonanywhere } from "react-icons/si";
import { TbPackageExport } from "react-icons/tb";
import { FcAssistant } from "react-icons/fc";
import BrandItem from "./BrandItem";

const Brands = () => {
  return (
    <div className="grid lg:grid-cols-3  sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-10 pt-20 md:px-0 px-5">
      <BrandItem
        title="World Class Partners"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={IoIosPartlySunny}
      />{" "}
      <BrandItem
        title="Fast Global Supports"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={AiOutlineGlobal}
      />{" "}
      <BrandItem
        title="Trusting Security"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={MdOutlineSecurity}
      />{" "}
      <BrandItem
        title="Anywhere reculting"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={SiPythonanywhere}
      />{" "}
      <BrandItem
        title="Export Advice"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={TbPackageExport}
      />{" "}
      <BrandItem
        title="Assisted Onboarding"
        text="Connect with LinkedIn, Google, and 70+ other apps and tools to get more
        done. Make your work easier by linking your favorite platforms. Stay on
        top of tasks, calendars, and messages in one spot. Save time and focus
        better with our easy connections."
        icon={FcAssistant}
      />
    </div>
  );
};

export default Brands;
