const TIME = document.querySelector('.time');
const NAME = document.querySelector('.name');
const TASK = document.querySelector('.task-a');
const BG = document.querySelector('.container');
const GREETING = document.querySelector('.greeting');
//clear name field after click
NAME.addEventListener('click', () => {
  if (NAME.innerHTML === '[Enter Name]') {
    NAME.innerHTML = '';
  }
});
//clear task field after click
TASK.addEventListener('click', () => {
  if (TASK.innerHTML === '[Enter Task]') {
    TASK.innerHTML = '';
  }
});

//set name and task listeners 
NAME.addEventListener('keypress', setName)
NAME.addEventListener('blur', setName)
TASK.addEventListener('keypress', setTask)
TASK.addEventListener('blur', setTask)
function getTime() {
  let time = new Date(),
    hour = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds();
  const timeString = `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;
  TIME.innerHTML = timeString;

  setTimeout(getTime, 1000)

}
//change background
function bgChanger() {
  let time = new Date();
  hour = time.getHours();
  if (hour < 12) {
    //morning bg
    BG.classList.add('morning-bg');
    GREETING.innerHTML = 'Good Morning';
  } else if (hour < 18) {
    //afternoon
    BG.classList.add('day-bg');
    GREETING.innerHTML = 'Good Afternoon';

  } else {
    //evening
    BG.classList.add('evening-bg');
    GREETING.innerHTML = 'Good Evening';

  }
}
//add zero before number in clock if number less then 10
function addZero(number) {
  return number < 10 ? `0${number}` : number
}

//set name to localstorage
function setName(e) {
  if (e.type === 'keypress') {
    if (e.keyCode === 13 || e.which === 13) {
      if (NAME.innerHTML === '' || NAME.innerHTML.search('<br>') !== -1) {
        getName();
        return;
      }
      localStorage.setItem('name', NAME.innerHTML);
      NAME.blur();
    }
  } else {
    if (NAME.innerHTML === '' || NAME.innerHTML.search('<br>') !== -1) {
      getName();
      return;
    }
    localStorage.setItem('name', NAME.innerHTML);
  }
}

//set task to localStorage
function setTask(e) {
  if (e.type === 'keypress') {
    if (e.keyCode === 13 || e.which === 13) {
      if (TASK.innerHTML === '' || TASK.innerHTML.search('<br>') !== -1) {
        getTask();
        return;
      }
      localStorage.setItem('task', TASK.innerHTML);
      TASK.blur();
    }
  } else {
    if (TASK.innerHTML === '' || TASK.innerHTML.search('<br>') !== -1) {
      getTask();
      return;
    }
    localStorage.setItem('task', TASK.innerHTML);
  }
}

//get name from local storage
function getName() {
  let name;
  if (localStorage.getItem('name') === null) {
    name = '[Enter Name]';
  } else {
    name = localStorage.getItem('name')
  }
  NAME.innerHTML = name
}

//get task from local storage
function getTask() {
  let task;
  if (localStorage.getItem('task') === null) {
    task = '[Enter Task]';
  } else {
    task = localStorage.getItem('task')
  }
  TASK.innerHTML = task
}

function app() {
  getTime();
  bgChanger();
  getName();
  getTask();
}

app();
