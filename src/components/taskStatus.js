import React from "react";
import { useRecoilValue } from "recoil";
import { tasksStatusSelector } from "../states/taskState";
import { Table } from "reactstrap";

const TaskStatus = () => {
  const status = useRecoilValue(tasksStatusSelector);
  return (
    <div className="status-div">
      <h4>
        <b>Tasks Status</b>
      </h4>
      <Table>
        <thead></thead>
        <tbody>
          {status.map((val, valIndex) => {
            return (
              <tr key={valIndex}>
                <td>{val[0]}</td>
                <td>:</td>
                <td>{val[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskStatus;
