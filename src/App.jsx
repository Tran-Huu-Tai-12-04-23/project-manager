import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "./Store/themeSlice";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Layout/Home";
import Sign from "./Layout/Sign";
import Test from "./Layout/Test";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import ModalCustom from "./Component/Modal";
import { Slide } from "react-awesome-reveal";
import FormAddNewProject from "./Component/FormAddNewProject";
import LoadInit from "./Component/LoadInit";
import Service from "./Service";
import { numberTrashAction } from "./Store/numberTrashSlice";

function App() {
  const [openModalAddNewProject, setOpenModalAddNewProject] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.reducer.theme);
  const dataLogin = useSelector((state) => state.reducer.dataLogin);
  const [waitLoad, setWaitLoad] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch(themeAction.switchTheme("dark"));
    } else {
      dispatch(themeAction.switchTheme("light"));
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    dispatch(themeAction.switchTheme(theme == "dark" ? "light" : "dark"));
  };
  const notify = () => {
    toast("Đây là thông báo đến laptop/PC!");
  };



  // useEffect(() => {
  //   // Kiểm tra xem trình duyệt hỗ trợ Push Notifications
  //   if ("serviceWorker" in navigator && "PushManager" in window) {
  //     // Đăng ký service worker
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log("Service Worker đã được đăng ký:", registration);

  //         // Yêu cầu quyền hiển thị thông báo
  //         return Notification.requestPermission();
  //       })
  //       .then((permission) => {
  //         if (permission === "granted") {
  //           console.log("Người dùng đã chấp nhận thông báo");
  //         } else {
  //           console.log("Người dùng đã từ chối thông báo");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Lỗi đăng ký Push Notifications:", error);
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const timeOut = () => {
      setWaitLoad(false);
    };

    let timeoutId = null;

    timeoutId = setTimeout(timeOut, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const initNumberTrash = async () => {
      const result = await Service.getDataFromApi(`/project/count-number-project-trash/?userId=${dataLogin.id}`);
      if( result.status === true ) {
        dispatch(numberTrashAction.initNumberTrash({number: result.data}));
      }
    };
    if( dataLogin.isLogin ) {
      initNumberTrash();
    }
  }, [dataLogin])

  return (
    <div className="transition-all overflow-hidden bg-light-primary dark:bg-dark-primary">
      {waitLoad && (
        <div className="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-light-primary dark:bg-dark-primary ">
          <LoadInit />
        </div>
      )}
      {/* <Button onClick={handleThemeSwitch}>Click</Button> */}
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home setOpenModalAddNewProject={setOpenModalAddNewProject} />
            }
          />
          <Route exact path="/sign" element={<Sign />} />
        </Routes>
      </Router>
      <ToastContainer />(
      <div
        className={`w-screen fixed top-0 left-0 bottom-0 right-0 z-20 ${
          openModalAddNewProject ? "opacity-100" : "opacity-0 hidden"
        } transition-all`}
      >
        <Slide delay={0} direction="down" duration={500}>
          <FormAddNewProject
            action={(e) => setOpenModalAddNewProject(false)}
          ></FormAddNewProject>
        </Slide>
      </div>
      )
    </div>
  );
}

export default App;
