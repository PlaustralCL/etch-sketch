/** Function delcarations are alphabetized. Global variables, initial event
 * listeners, and the initiating fucntion call are at the bottom of the file.
 */

function addGridHoverListener() {
  /** Adds a mouseover listner to each div created from makeBoard(). When
   * a mouseover event is detected, the changeSquareColor() function is called.
   */
  const divs = document.querySelectorAll('.item');
  divs.forEach((div) => {
    div.addEventListener('mouseover', changeSquareColor);
  });
  return;
}

function changeSquareColor(event) {
  /** Change the background color of the div (based on id) that had the mouseover */
  event.target.style.backgroundColor = setColor(event.target.id);
}

function clearBoard(event) {
  /**Resets the backgroundColor for each div and resets all elements in 
   * gridColorArray.
   */
  const divResets = document.querySelectorAll('.item');
  divResets.forEach((div) => {
    div.style.backgroundColor = ''; // sets each div to the default for class .item
  });
  //Reset all gridColorArray all back to white when the board is cleared
  gridColorArray.forEach((element, index) => gridColorArray[index] = 247);
  resetFocus();
  return;
}

function clickActions(event) {
  /** Clearing house for click actions. Based on the id that was clicked,
   * sets the colorMode. For clearBoard or resize clicks, redirects to the 
   * properfuction.
   */
  if (this.id === 'clearBoard') {
    clearBoard(event);
  } else if (this.id === 'resize') {
      launchModal();
  } else if (this.id === 'rainbow') {
      colorMode = 'rainbow';
  } else if (this.id === 'normal') {
      colorMode = 'normal';
  } else if (this.id === 'greyScale') {
    colorMode = 'greyScale';
  } else if (this.id === 'erase') {
    colorMode = 'erase';
  } else if (this.id === 'submitResize') {
    getResizeInput(event);
  }
  return;
}

function getRandomInt(min, max) {
  /**Returns a random integer betwen the min and max values. */
  min = Math.ceil(min);
  max = Math.floor(max); 
  return Math.floor(Math.random() * (max - min) + min); 
  //The maximum is exclusive and the minimum is inclusive
}

function getResizeInput(event) {
  /**This is called from clickActions() after the submit button is clicked. 
   * Gets user input from the input form once the user clicks the submit button
   * in the modal form. The input is validated to be between 1 and 100. (The 
   * input box won't except non-numbers. Once valid input is received the
   * pre-existing divs are deleted in preparation for makeBoard().
   */
  event.preventDefault(); // prevents the form from trying to submit to a server
  document.getElementById('input-error').textContent = ''; //clears the error notice
  const squares = parseInt(document.getElementById('squares').value);
  
  //validates if the input is acceptable
  if (squares < 1 || squares > 100) {
    document.getElementById('input-error').textContent = 'Please pick a number betwen 1 and 100';
    return; 
    //kicks out of this function so that no changes are made to the grid size if input is invalid
  }

  document.getElementById('modalContainer').style.display = 'none'; // hides the modal again
  document.getElementById('squares').value = ''; // clears the input box for next time
  
  // remove all divs that were previously created in the drawing area before making new divs
  document.querySelectorAll('.item').forEach(e => e.remove()); 
  
  makeBoard(squares);
  return;
}

function keyEvent(event) {
  /** Action to take when the escape key is pressed. Only works when the modal
   * is open.
   */
  if (event.code == 'Escape') {
    document.getElementById('modalContainer').style.display = 'none';
  }  
  return;
}

function launchModal() {
  /** Called by the clickActions() function when the resize buton is clicked.
   * Displays the modal box and puts the focus on the input box.
   */
  document.getElementById('modalContainer').style.display = 'flex';
  document.getElementById('squares').focus(); // puts the focus in the input box
  return;
}

function makeBoard(num) {
/** This function creates the drawing board by creating divs and adding them to
 * DOM. An id is added to each div. An array is also created to track the color
 * of each div when grey scale mode is selected. The num arugment is the number
 * of squares on each side of the drawing area.
 */

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
  return;
}

function resetFocus() {
  /** Reset focus to show color mode after clear or resize */
  document.getElementById(colorMode).focus();
  return;
}

function setColor(gridId) {
  /** Determines the proper color for the div background based on the colorMode
   * variable. Called by changeSquareColor().
   */
  switch (colorMode) {
    case 'normal':
      return 'black';
      break;
    case 'rainbow':
      return rainbowArray[getRandomInt(0,39)];
      break;
    case 'erase':
      gridColorArray[gridId] = 247;
      return '#f7f7f7';
      break;
    case 'greyScale':
      if (gridColorArray[gridId] > 0) { // 0 is as black as it gets
        gridColorArray[gridId] -= 24.7;
      }
      return `rgb(${Math.round(gridColorArray[gridId])}, ${Math.round(gridColorArray[gridId])}, ${Math.round(gridColorArray[gridId])})`;
      break;
    default:
      return 'crimson';
  } 
}

function showGridSize(size) {
  /** publishes the grid size on the page. This is called makeBoard() whenver 
   * the board is made initially or resized.
   */
  document.getElementById('gridSize').textContent = `Grid size: ${size} x ${size}`;
  return;
}

/** Non function code */

/** Gloabl variables */
const btn = document.querySelectorAll('.btn');
let colorMode = 'normal';
let gridColorArray = []; // initialize the array
const rainbowArray = ['aqua', 'blue', 'fuchsia', 'green', 'lime', 'maroon',
    'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow', 'bisque',
    'blueviolet', 'cadetblue', 'chartreuse', 'crimson', 'cyan', 'darkcyan',
    'darksalmon', 'darkseagreen', 'deepskyblue', 'goldenrod', 'lightcoral',
    'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lime',
    'magenta', 'mediumorchid', 'mediumspringgreen', 'mistyrose',
    'mediumslateblue', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
     'paleturquoise'];
const sideLength = 10; //set initial value for pixel (square) size

/** Event listeners */
btn.forEach((button) => {
  button.addEventListener('click', clickActions);
});

document.onclick = function(event) {
  /** closes modal if user clicks outside of the form */
  if (event.target.id === 'modalContainer') {
    document.getElementById('modalContainer').style.display = 'none';
  }
}

document.addEventListener('keydown', keyEvent);

/** Intiate the board */
makeBoard(sideLength);
