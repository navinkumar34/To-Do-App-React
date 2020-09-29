import React, { useEffect } from "react";
import TaskTable from "../components/taskTable";
import TaskStatus from "../components/taskStatus";
import {
  cTaskName,
  cPriority,
  cDescription,
  cIndex,
  isSubmitting,
  cCompletion
} from "../states/taskState";
import { useSetRecoilState } from "recoil";

const Home = () => {
  const setTaskName = useSetRecoilState(cTaskName);
  const setPriority = useSetRecoilState(cPriority);
  const setDescription = useSetRecoilState(cDescription);
  const setSelectedIndex = useSetRecoilState(cIndex);
  const setSubmitting = useSetRecoilState(isSubmitting);
  const setCompleted = useSetRecoilState(cCompletion);
  useEffect(() => {
    setTaskName("");
    setPriority("Low");
    setCompleted(false);
    setSelectedIndex(-1);
    setDescription("");
    setSubmitting(false);
  });
  return (
    <div style={{ padding: "10px" }}>
      <TaskTable />
      <TaskStatus />
    </div>
  );
};

export default Home;
