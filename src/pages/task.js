import React from "react";
import { useRecoilState } from "recoil";
import { useHistory, NavLink } from "react-router-dom";
import routes from "../routes/route";
import {
  tasksState,
  cTaskName,
  cPriority,
  cDescription,
  cIndex,
  isSubmitting,
  cCompletion
} from "../states/taskState";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  Container,
  Row,
  Col
} from "reactstrap";

const Task = () => {
  const history = useHistory();
  const [Tasks, setTasks] = useRecoilState(tasksState);
  const [TaskName, setTaskName] = useRecoilState(cTaskName);
  const [Priority, setPriority] = useRecoilState(cPriority);
  const [Description, setDescription] = useRecoilState(cDescription);
  const [selectedIndex, setSelectedIndex] = useRecoilState(cIndex);
  const [submitting, setSubmitting] = useRecoilState(isSubmitting);
  const [completed, setCompleted] = useRecoilState(cCompletion);

  const TaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleChange = (event) => {
    setPriority(event.target.value);
  };
  const DescChange = (event) => {
    setDescription(event.target.value);
  };

  const saveTask = () => {
    setSubmitting(true);
    const newTask = {
      text: TaskName,
      isComplete: completed,
      priority: Priority,
      description: Description
    };
    let newTasksArr = Tasks;
    selectedIndex === -1
      ? setTasks(newTasksArr.concat(newTask))
      : setTasks([
          ...newTasksArr.slice(0, selectedIndex),
          ...newTasksArr.slice(selectedIndex + 1, newTasksArr.length),
          newTask
        ]);
    setTaskName("");
    setPriority("Low");
    setCompleted(false);
    setSelectedIndex(-1);
    setDescription("");
    setSubmitting(false);
    history.push(routes.home);
  };

  return (
    <div className="taskDiv">
      <Form>
        <FormGroup>
          <Label for="taskName" onSubmit={saveTask}>
            Task Name :
          </Label>
          <Input
            type="text"
            name="taskName"
            id="taskName"
            placeholder="Enter New Task Here...."
            value={TaskName}
            onChange={TaskNameChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="taskPriority">Select Priority:</Label>
          <Input
            type="select"
            name="taskPriority"
            id="taskPriority"
            value={Priority}
            onChange={handleChange}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="taskDescription">Task Description</Label>
          <Input
            type="textarea"
            value={Description}
            onChange={DescChange}
            name="taskDescription"
            id="taskDescription"
          />
        </FormGroup>
        <Container>
          <Row>
            <Col></Col>
            {submitting ? (
              <Spinner type="grow" color="primary" />
            ) : (
              <Button type="submit">Save Task</Button>
            )}
            <Col>
              <Button className="btn btn-primary">
                <NavLink to="/" style={{ color: "white" }}>
                  Go to Home
                </NavLink>
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  );
};

export default Task;
