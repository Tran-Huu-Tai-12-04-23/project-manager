import { combineReducers } from "@reduxjs/toolkit";
import { themeReducer } from "./themeSlice";
import { taskReducer } from "./taskSlice";
import { loginReducer } from "./dataLoginSlice";
import { projectReducer } from "./projectSlice";
import { projectDetailReducer } from "./projectDetailSlice";
import { projectTrashReducer } from "./projectTrashSlice";
import { numberTrashReducer } from "./numberTrashSlice";

const rootReducer = combineReducers({
  theme: themeReducer,
  tasks: taskReducer,
  dataLogin: loginReducer,
  projects: projectReducer,
  projectDetail: projectDetailReducer,
  projectTrash: projectTrashReducer,
  numberTrash: numberTrashReducer
});

export default rootReducer;
