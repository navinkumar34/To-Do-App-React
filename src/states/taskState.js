import { atom, selector } from "recoil";

export const tasksState = atom({
  key: "tasksState",
  default: window.localStorage.getItem("tasks-data")
    ? JSON.parse(window.localStorage.getItem("tasks-data"))
    : [
        {
          text: "Go for a walk",
          isComplete: false,
          priority: "Low",
          description: "Need to Cover 5 km today"
        },
        {
          text: "Watch Movie",
          isComplete: true,
          priority: "Medium",
          description: "Watch a Movie on NetFlix"
        }
      ]
});

export const tasksStatusSelector = selector({
  key: "tasksStatusSelector",
  get: ({ get }) => {
    const tasks = get(tasksState);
    let lows = 0;
    let mediums = 0;
    let highs = 0;
    let completeds = 0;
    let incompletes = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isComplete) completeds++;
      else incompletes++;
      if (tasks[i].priority === "High") highs++;
      else if (tasks[i].priority === "Medium") mediums++;
      else lows++;
    }
    return [
      ["Completed Tasks", completeds],
      ["Pending Tasks", incompletes],
      ["High Priority Tasks", highs],
      ["Medium Priority Tasks", mediums],
      ["Low Priority Tasks", lows]
    ];
  }
});

export const cPriority = atom({
  key: "cPriority",
  default: "Low"
});

export const cTaskName = atom({
  key: "cTaskName",
  default: ""
});

export const cDescription = atom({
  key: "cDescription",
  default: ""
});

export const cIndex = atom({
  key: "cIndex",
  default: -1
});

export const isSubmitting = atom({
  key: "isSubmitting",
  default: false
});

export const cCompletion = atom({
  key: "isCompletion",
  default: false
});

export const alertText = atom({
  key: "alertText",
  default: ""
});

export const filPriority = atom({
  key: "filPriority",
  default: "All"
});

export const filCompletion = atom({
  key: "filCompletion",
  default: "All"
});
