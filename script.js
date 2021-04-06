function makeBoard(num) {
  // num is the length of a side
  gridColorArray = []; // clears all array elements for a fresh start
  document.getElementById('grid').style.gridTemplateRows = `repeat(${num}, 1fr)`;
  document.getElementById('grid').style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  for (let i = 0; i < num * num; i++) {
    const div = document.createElement('div');
    /* let textNode = document.createTextNode(i);
    div.appendChild(textNode); */
    div.setAttribute('id', `${i}`);
    div.classList.add('item');
    document.getElementById('grid').appendChild(div);
    gridColorArray.push(255); //rgb(255, 255, 255) is white
  }
  addGridHoverListener();
}

function addGridHoverListener() {
  const divs = document.querySelectorAll('.item');
  divs.forEach((div) => {
    div.addEventListener('mouseover', changeSquareColor);
  });
}

function changeSquareColor(event) {
  event.target.style.backgroundColor = setColor(event.target.id);
}

function setColor(gridId) {
  switch (colorMode) {
    case 'normal':
      return 'lightblue';
      break;
    case 'rainbow':
      return rainbowArray[getRandomInt(0,13)];
      break;
    case 'grey':
      if (gridColorArray[gridId] > 0) {
        gridColorArray[gridId] -= 25.5;
      }
      console.log('grid number = ' + gridId);
      console.log('grid color = ' + Math.round(gridColorArray[gridId]));
      return `rgb(${Math.round(gridColorArray[gridId])}, ${Math.round(gridColorArray[gridId])}, ${Math.round(gridColorArray[gridId])})`;
      break;
    default:
      return 'crimson';

  } 
}

function clickActions(event) {
  console.log('click');
  if (this.id === 'clearBoard') {
    console.log('id = clearBoard')
    clearBoard(event);
  } else if (this.id === 'resize') {
      getResizeInput();
  } else if (this.id === 'rainbow') {
      colorMode = 'rainbow';
      console.log(colorMode);    
  } else if (this.id === 'defaultColor') {
      colorMode = 'normal';
  } else if (this.id === 'greyScale') {
    colorMode = 'grey';
    console.log(colorMode);  
  }

}

function getResizeInput() {
  console.log('resize board function');
  const square = parseInt(prompt('Lenght of each side?', '5'));
  document.querySelectorAll('.item').forEach(e => e.remove());
  console.log(square);
  console.log(typeof(square));
  makeBoard(square);
}

function clearBoard(event) {
  const divResets = document.querySelectorAll('.item');
  divResets.forEach((div) => {
    div.style.backgroundColor = ''; // sets each div to white
  });
  //Reset all gridColorArray all back to white when the board is cleared
  gridColorArray.forEach((element, index) => gridColorArray[index] = 255);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min) + min); 
  //The maximum is exclusive and the minimum is inclusive
}

// Main conde
const sideLength = 5;
const rainbowArray = ['aqua', 'blue', 'fuchsia', 'green', 'lime', 'maroon',
    'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow'];
const defaultColor = 'lightblue';
let colorMode = 'normal';
let gridColorArray = [];
makeBoard(sideLength);

addGridHoverListener();

const btn = document.querySelectorAll('.btn');

btn.forEach((button) => {
  button.addEventListener('click', clickActions);
});
