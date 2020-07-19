var length = 20,
  dir = "d",
  delay = 400,
  up = document.querySelector("#up"),
  down = document.querySelector("#down"),
  left = document.querySelector("#left"),
  right = document.querySelector("#right"),
  container = document.querySelector(".container"),
  queue = [],
  bodyLen = 1,
  foodMap = new Map();

for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    let box = document.createElement("div");
    box.classList.add("box");
    document.querySelector(".container").appendChild(box);
  }
}

let boxes = document.querySelectorAll(".box"),
  width = container.clientWidth / 20,
  height = container.clientHeight / 20;
for (let i = 0; i < boxes.length; i++) {
  const box = boxes[i];
  let atr = document.createAttribute("data-idx");
  atr.value = i;
  box.setAttributeNode(atr);
  box.style.width = `${width}px`;
  box.style.height = `${height}px`;
}

let head = boxes[createRandomNumber()];
head.classList.add("head");
queue.unshift(head);
generateRandomFood();

down.addEventListener("click", function () {
  if (dir != "u") {
    dir = "d";
    moveDown();
  }
});
up.addEventListener("click", function () {
  if (dir != "d") {
    dir = "u";
    moveUp();
  }
});
left.addEventListener("click", function () {
  if (dir != "r") {
    dir = "l";
    moveLeft();
  }
});
right.addEventListener("click", function () {
  if (dir != "l") {
    dir = "r";
    moveRight();
  }
});

function createRandomNumber() {
  let rdm = Math.floor(Math.random() * boxes.length);
  while (foodMap.has(rdm)) {
    rdm = Math.floor(Math.random() * boxes.length);
    if (
      !boxes[rdm].classlist.contains("food") &&
      !boxes[rdm].classlist.contains("body") &&
      !boxes[rdm].classlist.contains("head")
    ) {
      foodMap.set(rdm, rdm);
      return rdm;
    }
  }
  return rdm;
}

function generateRandomFood() {
  let food = createRandomNumber();
  boxes[food].classList.add("food");
  boxes[food].innerHTML = '<i class="fas fa-apple-alt"></i>';
}

function getIndex(node) {
  return parseInt(node.getAttribute("data-idx"));
}

function moveBody() {
  let count = 0;
  for (let i = queue.length - 1; i > 0; i--) {
    if (queue.length > bodyLen) {
      while (queue.length != bodyLen) {
        let el = queue.pop();
        el.classList.remove("body");
        count++;
      }
    }
  }
  for (let i = 1; i < queue.length; i++) {
    let el = queue[i];
    el.classList.add("body");
  }
}

function addBodyWhenEatFood(newHead) {
  if (newHead.classList.contains("food")) {
    newHead.innerHTML = "";
    generateRandomFood();
    bodyLen++;
  }
}

function replaceHead(prevHead, newHead) {
  newHead.classList.add("head");
  prevHead.classList.remove("head");
  prevHead.classList.remove("food");
  if (newHead.classList.contains("body")) {
    reset();
    return;
  }
  queue.unshift(newHead);
}

function reset() {
  alert("Game Over");
  let body = document.querySelectorAll(".body"),
    food = document.querySelector(".food"),
    head = document.querySelector(".head"),
    random = createRandomNumber();
  for (let i = 0; i < body.length; i++) {
    const el = body[i];
    el.classList.remove("body");
  }
  food.innerHTML = "";
  food.classList.remove("food");
  head.classList.remove("head");
  boxes[random].classList.add("head");
  foodMap = new Map();
  dir = "d";
  queue = [];
  bodyLen = 1;
  queue.unshift(boxes[random]);
  generateRandomFood();
}

function moveDown() {
  var prevHead = queue[0];
  var newHead = boxes[getIndex(prevHead) + length];
  if (dir == "d") {
    if (newHead) {
      addBodyWhenEatFood(newHead);
      replaceHead(prevHead, newHead);
      moveBody();
    } else {
      reset();
    }
  }
  setTimeout(() => {
    if (dir == "d" && boxes[getIndex(prevHead) + length]) {
      moveDown();
    }
  }, delay);
}

function moveUp() {
  var prevHead = queue[0];
  var newHead = boxes[getIndex(prevHead) - length];
  if (dir == "u") {
    if (newHead) {
      addBodyWhenEatFood(newHead);
      replaceHead(prevHead, newHead);
      moveBody();
    } else {
      reset();
    }
  }
  setTimeout(() => {
    if (dir == "u" && boxes[getIndex(prevHead) - length]) {
      moveUp();
    }
  }, delay);
}

function moveLeft() {
  var prevHead = queue[0];
  var newHead =
    getIndex(prevHead) - 1 < 0 ? prevHead : boxes[getIndex(prevHead) - 1];
  if (dir == "l") {
    if (getIndex(prevHead) % length != 0) {
      addBodyWhenEatFood(newHead);
      replaceHead(prevHead, newHead);
      moveBody();
    } else {
      reset();
    }
  }
  setTimeout(() => {
    if (dir == "l" && getIndex(prevHead) % length != 0) {
      moveLeft();
    }
  }, delay);
}

function moveRight() {
  var prevHead = queue[0];
  var newHead = boxes[getIndex(prevHead) + 1];
  if (dir == "r") {
    if ((getIndex(prevHead) + 1) % length != 0) {
      addBodyWhenEatFood(newHead);
      replaceHead(prevHead, newHead);
      moveBody();
    } else {
      reset();
    }
  }
  setTimeout(() => {
    if (dir == "r" && (getIndex(prevHead) + 1) % length != 0) {
      moveRight();
    }
  }, delay);
}

window.addEventListener("keydown", function (event) {
  if (dir == "u") {
    moveLeftRight();
  }

  if (dir == "l") {
    moveUpDown();
  }

  if (dir == "d") {
    moveLeftRight();
  }

  if (dir == "r") {
    moveUpDown();
  }
});

function moveUpDown() {
  if (event.which == 38) {
    //up
    dir = "u";
    moveUp();
  }
  if (event.which == 40) {
    // down
    dir = "d";
    moveDown();
  }
}

function moveLeftRight() {
  if (event.which == 37) {
    //left
    dir = "l";
    moveLeft();
  }
  if (event.which == 39) {
    // right
    dir = "r";
    moveRight();
  }
}
