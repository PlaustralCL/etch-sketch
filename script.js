function makeBoard(num) {
  document.getElementById('grid').style.gridTemplateRows = `repeat(${num}, 1fr)`;
  document.getElementById('grid').style.gridTemplateColumns = `repeat(${num}, 1fr)`;
  for (i = 0; i < num * num; i++) {
    const div = document.createElement('div');
    /* let textNode = document.createTextNode(i);
    div.appendChild(textNode); */
    div.setAttribute('id', `${i}`);
    div.classList.add('item');
    document.getElementById('grid').appendChild(div);
  }
  colorSquare();
}

function colorSquare() {
  const divs = document.querySelectorAll('.item');
  divs.forEach((div) => {
    div.addEventListener('mouseover', mouseOver);
  });
}

function mouseOver(event) {
  event.target.style.backgroundColor = 'lightblue';
}

function ClickAction(event) {
  console.log('click');
  if (this.id === 'reset') {
    console.log('id = reset')
    resetBoard(event);
  } else if (this.id === 'resize') {
    resizeBoard();
  }
}

function resizeBoard() {
  console.log('resize board function');
  let square = parseInt(prompt('Lenght of each side?', '4'));
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

let sideLength = 5;
makeBoard(sideLength);
document.getElementById(`${sideLength}`).style.backgroundColor = 'pink';
colorSquare();

function colorSquare() {
  const divs = document.querySelectorAll('.item');
  divs.forEach((div) => {
    div.addEventListener('mouseover', mouseOver);
  });
}

const btn = document.querySelectorAll('.btn');

btn.forEach((bob) => {
  bob.addEventListener('click', ClickAction);
});
