function makeBoard(num) {
  // num is the length of a side
  document.getElementById('grid').style.gridTemplateRows = `repeat(${num}, 1fr)`;
  document.getElementById('grid').style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  for (let i = 0; i < num * num; i++) {
    const div = document.createElement('div');
    /* let textNode = document.createTextNode(i);
    div.appendChild(textNode); */
    div.setAttribute('id', `${i}`);
    div.classList.add('item');
    document.getElementById('grid').appendChild(div);
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
  event.target.style.backgroundColor = 'lightblue';
}

function clickActions(event) {
  console.log('click');
  if (this.id === 'reset') {
    console.log('id = reset')
    resetBoard(event);
  } else if (this.id === 'resize') {
    getResizeInput();
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

function resetBoard(event) {
  const divResets = document.querySelectorAll('.item');
  divResets.forEach((div) => {
  div.style.backgroundColor = '';
  });
}

const sideLength = 5;
makeBoard(sideLength);
document.getElementById(`${sideLength}`).style.backgroundColor = 'pink';
addGridHoverListener();



const btn = document.querySelectorAll('.btn');

btn.forEach((button) => {
  button.addEventListener('click', clickActions);
});
