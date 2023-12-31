import { useNavigate } from "react-router-dom";

import WidgetsIcon from "@mui/icons-material/Widgets";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HelpIcon from "@mui/icons-material/Help";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { AiOutlineSetting } from "react-icons/ai";

import { Tooltip } from "@mui/material";
import logo from "../../assets/logo.png";

import { useDispatch } from "react-redux";
import { loginAction } from "../../Store/dataLoginSlice";
import { logOut } from "../../firebase/index";
import Util from "../../Util";

function MenuSideBar({ active, setActive }) {
  const nav = [
    {
      name: "Tổng quan",
      icon: <WidgetsIcon sx={{ width: 20, height: 20 }} />,
    },
    {
      name: "Dự án của bạn",
      icon: <AccountTreeIcon sx={{ width: 20, height: 20 }} />,
    },
    {
      name: "Lịch hoạt động",
      icon: <CalendarMonthIcon sx={{ width: 20, height: 20 }} />,
    },
    {
      name: "Phân tích",
      icon: <AnalyticsIcon sx={{ width: 20, height: 20 }} />,
    },
    {
      name: "Cài đặt",
      icon: (
        <AiOutlineSetting sx={{ width: 20, height: 20 }}></AiOutlineSetting>
      ),
    },
    {
      name: "Trợ giúp",
      icon: <HelpIcon sx={{ width: 20, height: 20 }} />,
    },
  ];
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    logOut();
    dispatch(loginAction.logout());
    history("/sign");
    localStorage.removeItem(Util.hashString("login"));
  };
  return (
    <>
      <div
        className={`relative w-14 text-sm h-screen pt-4 flex justify-start items-start `}
      ></div>
      <div
        className={`dark:bg-dark-primary z-20 w-14 fixed h-screen pt-4 flex justify-start items-start flex-col border-r-1 border-blur-light dark:border-blur-dark border-solid`}
      >
        <img className="h-8 w-10 mb-6 " src={logo}></img>
        <ul className="m-0 p-0 w-full">
          {nav.map((n, index) => {
            return (
              <Tooltip key={index} title={n.name} placement="left">
                <li
                  style={{
                    borderLeft: "4px solid transparent",
                    borderColor: index === active ? "#ccc" : "transparent",
                  }}
                  className="transition-all hover:bg-light-second cursor-pointer  dark:hover:bg-dark-second p-4 justify-start items-start flex"
                  onClick={(e) => setActive(index)}
                >
                  {n.icon}
                </li>
              </Tooltip>
            );
          })}
        </ul>
        <div className="transition-all hover:bg-light-second cursor-pointer w-full   dark:hover:bg-dark-second mb-2 justify-center items-start flex mt-auto">
          <Tooltip title="Đăng xuất">
            <button
              onClick={handleLogOut}
              className="reset ml-auto mr-auto p-2 w-fit rounded-sm"
            >
              <LogoutIcon className="rotate-50  mt-auto"></LogoutIcon>
            </button>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default MenuSideBar;
