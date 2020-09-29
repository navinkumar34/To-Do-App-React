import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { NavLink } from "react-router-dom";
import { Table, Button, Input, Label } from "reactstrap";
import {
  tasksState,
  filPriority,
  filCompletion,
  cTaskName,
  cPriority,
  cDescription,
  cIndex,
  isSubmitting,
  cCompletion
} from "../states/taskState";
import routes from "../routes/route";
import { useHistory } from "react-router-dom";

const comptask = (task, filterpri, filtercomp) => {
  if (filtercomp === "All") {
    if (filterpri === "All") {
      return true;
    } else {
      if (task.priority === filterpri) return true;
    }
    return false;
  } else if (filtercomp === "Completed") {
    if (task.isComplete) {
      if (filterpri === "All") {
        return true;
      } else {
        if (task.priority === filterpri) return true;
      }
    }
    return false;
  } else {
    if (!task.isComplete) {
      if (filterpri === "All") {
        return true;
      } else {
        if (task.priority === filterpri) return true;
      }
    }
    return false;
  }
};

const TaskTable = () => {
  const history = useHistory();
  const [Tasks, setTasks] = useRecoilState(tasksState);
  const setTaskName = useSetRecoilState(cTaskName);
  const setPriority = useSetRecoilState(cPriority);
  const setDescription = useSetRecoilState(cDescription);
  const setSelectedIndex = useSetRecoilState(cIndex);
  const setSubmitting = useSetRecoilState(isSubmitting);
  const setCompleted = useSetRecoilState(cCompletion);
  const [filterpri, setFilterpri] = useRecoilState(filPriority);
  const [filtercomp, setFiltercomp] = useRecoilState(filCompletion);
  const editCompletion = (selectedTaskIndex) => {
    setTasks(
      Tasks.map((task, taskIndex) => {
        if (taskIndex === selectedTaskIndex) {
          return {
            ...task,
            isComplete: !task.isComplete
          };
        }

        return task;
      })
    );
  };

  const removeTask = (selectedTaskIndex) => {
    const task1 = Tasks.slice(0, selectedTaskIndex);
    const task2 = Tasks.slice(selectedTaskIndex + 1, Tasks.length);
    setTasks([...task1, ...task2]);
  };

  const filterpriChange = (event) => {
    setFilterpri(event.target.value);
  };

  const filtercompChange = (event) => {
    setFiltercomp(event.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem("tasks-data", JSON.stringify(Tasks));
  });

  return (
    <div className="showTaskDiv">
      <Table className="headtable">
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <Button className="btn btn-primary">
                <NavLink to="/task"> Click to Add Task </NavLink>
              </Button>
            </td>
            <td>
              <Label for="filterPriority" id="filterLabel">
                Filter:
              </Label>
              <Input
                type="select"
                name="filterPriority"
                id="filterPriority"
                value={filterpri}
                onChange={filterpriChange}
                required
              >
                <option value="All">All Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </Input>
              <Input
                type="select"
                name="filterCompletion"
                id="filterCompletion"
                value={filtercomp}
                onChange={filtercompChange}
                required
              >
                <option value="All">All Completions</option>
                <option value="Completed">Completed</option>
                <option value="Incomplete">Incomplete</option>
              </Input>
            </td>
          </tr>
        </tbody>
      </Table>
      <h4>
        <b>Your Tasks</b>
      </h4>
      <Table className="tableTask">
        <thead>
          <tr>
            <th>Completed</th>
            <th>Task</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Tasks.map((task, taskIndex) => {
            const checkboxChangeHandler = () => editCompletion(taskIndex);
            const taskRemover = () => removeTask(taskIndex);
            const taskViewer = () => {
              setTasks(Tasks);
              setTaskName(Tasks[taskIndex].text);
              setPriority(Tasks[taskIndex].priority);
              setCompleted(Tasks[taskIndex].isComplete);
              setSelectedIndex(taskIndex);
              setDescription(Tasks[taskIndex].description);
              setSubmitting(false);
              history.push(routes.task);
            };
            return comptask(task, filterpri, filtercomp) ? (
              <tr key={taskIndex}>
                <td>
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.isComplete}
                    onChange={checkboxChangeHandler}
                  />
                </td>
                <td>{task.text}</td>
                <td>{task.priority}</td>
                <td>
                  <Button className="btn btn-info" onClick={taskViewer}>
                    View
                  </Button>
                  <Button className="btn btn-danger" onClick={taskRemover}>
                    Delete
                  </Button>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </Table>
      <br />
      <Button className="btn btn-primary">
        <NavLink to="/task"> Click to Add Task </NavLink>
      </Button>
    </div>
  );
};

export default TaskTable;
