import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuSideBar from "./MenuSideBar";
import ManagerProject from "./ManagerProject";
import Calender from "../../Component/Calender";
import Statistic from "./Statistic";
import Overview from "./Overview";
import Setting from "./Setting";

import { useSelector, useDispatch } from "react-redux";
import { projectAction } from "../../Store/projectSlice";
import Header from "./Header";
import Service from "../../Service";

const Home = ({ setOpenModalAddNewProject }) => {
  const [active, setActive] = useState(0);
  const history = useNavigate();
  const dataLogin = useSelector((state) => state.reducer.dataLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataLogin.isLogin) {
      history("/sign");
    }
  }, []);

  useEffect(() => {
    const intiProjects = async () => {
      const result = await Service.getDataFromApi(
        "/project/get-projects",
        `/?user_id=${dataLogin.id}`
      );

      dispatch(projectAction.init(JSON.parse(result.data)));
    };

    if (dataLogin.id) intiProjects();
  }, []);

  return (
    <div className="dark:text-white text-black font-primary min-h-screen w-screen overflow-hidden  flex justify-start">
      <MenuSideBar active={active} setActive={setActive}></MenuSideBar>
      {active === 1 && (
        <ManagerProject
          setOpenModalAddNewProject={setOpenModalAddNewProject}
        ></ManagerProject>
      )}
      {active !== 1 && (
        <div className="w-full">
          {active !== 1 && <Header></Header>}
          {active === 0 && (
            <Overview
              setOpenModalAddNewProject={setOpenModalAddNewProject}
            ></Overview>
          )}

          {active === 2 && (
            <div className="">
              <h1 className="pt-4 pl-0  ml-4 text-md border-b-4 border-solid border-primary w-fit mb-4 font-bold font-family">
                Lịch hoạt động
              </h1>
              <Calender />
            </div>
          )}

          {active === 3 && <Statistic></Statistic>}
          {active === 4 && <Setting></Setting>}
        </div>
      )}
    </div>
  );
};
export default Home;
