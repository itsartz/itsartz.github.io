const dom = {
  header: document.getElementById("header"),
  list: document.getElementById("list"),
  new: document.getElementById("new"),
  add: document.getElementById("add"),
  newtask: document.getElementById("newtask"),
};
const tasks = [];
console.log(dom);

//adding new task
dom.new.addEventListener("keyup", function (event) {
  const newTask = dom.new.value;
  if (event.keyCode === 13) {
    if (newTask && check(newTask, tasks)) {
      addTask(newTask, tasks);
      dom.new.value = "";
      render(tasks);
    }
    event.preventDefault();
    dom.add.click();
  }
});

dom.add.onclick = () => {
  const newTask = dom.new.value;
  if (newTask && check(newTask, tasks)) {
    addTask(newTask, tasks);
    dom.new.value = "";
    render(tasks);
  }
};

//function add the new task

function addTask(text, list) {
  const time = Date.now();
  const task = {
    id: time,
    text,
    completed: false,
  };
  list.push(task);
}

//checking if massive has the same element as input

function check(text, list) {
  let bool = true;

  list.forEach((task) => {
    if (task.text === text) {
      alert("The task already exists");
      dom.new.value = "";
      bool = false;
    }
  });
  return bool;
}

//Function that shows tasks added from input

function render(list) {
  let htmlList = "";

  list.forEach((task) => {
    const cls = task.completed ? "task completed" : "task";
    const checked = task.completed ? "checked" : "";
    const taskHTML = `
    <div id="${task.id}" class="${cls}">
      <label class="checkbox">
        <input type="checkbox" ${checked}>
          <div class="checkbox_div"></div>
      </label>
          <div class="task_title">${task.text}</div>
          <div class="del">-</div>
    </div>
    `;
    htmlList = htmlList + taskHTML;
  });

  dom.list.innerHTML = htmlList;
}

dom.list.onclick = (event) => {
  const target = event.target;
  const checkbox = target.classList.contains("checkbox_div");
  const deleter = target.classList.contains("del");

  if (checkbox) {
    const task = target.parentElement.parentElement;
    const taskID = task.getAttribute("id");
    changeStatus(taskID, tasks);
    render(tasks);
  }
  if (deleter) {
    const task = target.parentElement;
    const taskID = task.getAttribute("id");
    deleteTask(taskID, tasks);
    render(tasks);
  }
};

//chnageStatus function

function changeStatus(id, list) {
  list.forEach((task) => {
    if (task.id == id) {
      task.completed = !task.completed;
    }
  });
}

// function of deleting tasks

function deleteTask(id, list) {
  list.forEach((task, idx) => {
    if (task.id == id) {
      list.splice(idx, 1);
    }
  });
}
