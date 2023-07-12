import { useEffect, useState , memo} from "react";

import { LuHistory } from "react-icons/lu";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdOutlineAdd } from "react-icons/md";
import CardProject from "../../../Component/CardProject";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

import WaitLoad from "../../../Component/WaitLoad";

function Overview({ setOpenModalAddNewProject, setActive }) {
  const projects = useSelector((state) => state.reducer.projects);
  const [waitLoad, setWaitLoad] = useState(false);
  const [editProject, setEditProject] = useState(false);
  const [projectSelect, setProjectSelect] = useState(null);

  return (
    <div className="p-4 w-full " style={{
      height: 'calc(100% - 4rem)',
    }}>
      {editProject && (
        <div
          className="fixed transition-all  top-0 left-0 right-0 bottom-0  z-30"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onClick={(e) => {
            setEditProject(false);
            setProjectSelect(null);
          }}
        ></div>
      )}
      <div className="flex justify-start items-center">
        <LuHistory></LuHistory>
        <h5 className="font-family ml-2 font-bold text-md">
          Dự án đã xem gần đây
        </h5>
      </div>
      {waitLoad && <WaitLoad></WaitLoad>}
      {!waitLoad && (
        <div className="grid grid-cols-5 mt-5 gap-5">
          {/* {projects.map((project, index) => {
            return (
              <CardProject
                projectSelect={projectSelect}
                activeEdit={projectSelect?._id === project._id}
                handleEditProject={(e) => {
                  setEditProject(!editProject);
                }}
                ={setOpenModalAddNewProject}
                setProjectSelect={setProjectSelect}
                setActive={setActive}
                data={project}
                key={index}
                setEditProject={setEditProject}
              ></CardProject>
            );
          })} */}
        </div>
      )}
      <div className="flex justify-start mt-5 items-center">
        <BsPersonWorkspace></BsPersonWorkspace>
        <h5 className="font-family ml-2 font-bold text-md">
          Các dự án của bạn
        </h5>
      </div>

      {waitLoad && <WaitLoad></WaitLoad>}
      {!waitLoad && (
        <div className="grid grid-cols-5 mt-5 gap-5">
          {projects.map((project, index) => {
            return (
              <CardProject
                projectSelect={projectSelect}
                activeEdit={projectSelect?._id === project._id}
                handleEditProject={(e) => {
                  setEditProject(!editProject);
                }}
                setProjectSelect={setProjectSelect}
                setActive={setActive}
                data={project}
                key={index}
                setEditProject={setEditProject}
              ></CardProject>
            );
          })}
          <Tooltip title="Thêm dự án">
            <div
              onClick={(e) => setOpenModalAddNewProject(true)}
              className=" cursor-pointer hover:brightness-125 w-full justify-center items-center flex bg-light-second dark:bg-dark-second rounded-xl"
            >
              <MdOutlineAdd className="text-3xl"></MdOutlineAdd>
            </div>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default memo(Overview);
