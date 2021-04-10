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
    gridColorArray.push(247); //rgb(247, 247, 247) is the background color for .item
  }
  showGridSize(num);
  resetFocus();
  addGridHoverListener();
}

function showGridSize(size) {
  document.getElementById('gridSize').textContent = `Grid size: ${size} x ${size}`;
  return;
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
      return rainbowArray[getRandomInt(0,39)];
      break;
    case 'erase':
      gridColorArray[gridId] = 247;
      return '#f7f7f7';
      break;
    case 'greyScale':
      if (gridColorArray[gridId] > 0) {
        gridColorArray[gridId] -= 24.7;
      }
      return `rgb(${Math.round(gridColorArray[gridId])}, ${Math.round(gridColorArray[gridId])}, ${Math.round(gridColorArray[gridId])})`;
      break;
    default:
    console.log('%cNo color selection found: setColor()', 'corlor: red');  
    return 'crimson';

  } 
}

function clickActions(event) {
  console.log('click');
  if (this.id === 'clearBoard') {
    console.log('id = clearBoard')
    clearBoard(event);
  } else if (this.id === 'resize') {
      launchModal();
  } else if (this.id === 'rainbow') {
      colorMode = 'rainbow';
      console.log(colorMode);    
  } else if (this.id === 'normal') {
      colorMode = 'normal';
  } else if (this.id === 'greyScale') {
    colorMode = 'greyScale';
    console.log(colorMode);  
  } else if (this.id === 'erase') {
    colorMode = 'erase';
  } else if (this.id === 'submitResize') {
    getResizeInput(event);
  }
}

function keyEvent(event) {
  if (event.code == 'Escape') {
    console.log('escape!');
    document.getElementById('modalContainer').style.display = 'none';
  }  
}

function launchModal() {
  console.log('launchModal');
  document.getElementById('modalContainer').style.display = 'flex';
  document.getElementById('squares').focus(); // puts the focus in the input box
}


function getResizeInput(event) {
  event.preventDefault(); // prevents the form from trying to submit to a server
  document.getElementById('input-error').textContent = '';
  const squares = parseInt(document.getElementById('squares').value);
  
  if (squares < 1 || squares > 100) {
    document.getElementById('input-error').textContent = 'Please pick a number betwen 1 and 100';
    return;
  }

  document.getElementById('modalContainer').style.display = 'none'; // hides the modal again
  // remove all divs that were previously created in the drawing area
  document.querySelectorAll('.item').forEach(e => e.remove()); 
  makeBoard(squares);
  document.getElementById('squares').value = ''; // clears the input box
}

function clearBoard(event) {
  const divResets = document.querySelectorAll('.item');
  divResets.forEach((div) => {
    div.style.backgroundColor = ''; // sets each div to the default for class .item
  });
  //Reset all gridColorArray all back to white when the board is cleared
  gridColorArray.forEach((element, index) => gridColorArray[index] = 247);
  resetFocus();
  console.log({colorMode});
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min) + min); 
  //The maximum is exclusive and the minimum is inclusive
}

function resetFocus() {
  //Reset focus to show color mode after clear or resize
  console.log('resetFocus');
  document.getElementById(colorMode).focus();
  return;
}

// Main conde
const sideLength = 10; //set initial value for pixel (square) size
const rainbowArray = ['aqua', 'blue', 'fuchsia', 'green', 'lime', 'maroon',
    'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow', 'bisque',
    'blueviolet', 'cadetblue', 'chartreuse', 'crimson', 'cyan', 'darkcyan',
    'darksalmon', 'darkseagreen', 'deepskyblue', 'goldenrod', 'lightcoral',
    'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lime',
    'magenta', 'mediumorchid', 'mediumspringgreen', 'mistyrose',
    'mediumslateblue', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
     'paleturquoise'];
const defaultColor = 'lightblue';
let colorMode = 'normal';
let gridColorArray = [];
makeBoard(sideLength);

addGridHoverListener();

const btn = document.querySelectorAll('.btn');

btn.forEach((button) => {
  button.addEventListener('click', clickActions);
});

document.onclick = function(event) {
  // closes modal if user clicks outside of the form
  if (event.target.id === 'modalContainer') {
    document.getElementById('modalContainer').style.display = 'none';
  }
}

document.addEventListener('keydown', keyEvent);


