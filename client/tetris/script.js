  let squares = Array.from(buildUIGrids(grid, squareCount, squareCount - 10));
  let miniSquares = Array.from(buildUIGrids(miniGrid, 20, 0));
  /**
   * Redraw the current tetromino position
   *
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06Tfalse11:false11:false44-040
   */
  function draw() {
    // Loop through new position and add class
    current.forEach((i) => {
      squares[currentPosition + i].classList.add("tetromino");
    });
  }

  /**
   * Remove the current tetromino divs
   *
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06Tfalse11:false11:false29-040
   */
  function undraw() {
    // Loop through current position and remove class
    current.forEach((i) => {
      squares[currentPosition + i].classList.remove("tetromino");
    });
  }
    // Undraw div
    undraw();
    // Redraw and recalculate
    draw();
      draw();
    // Redraw
    draw();
    // Undraw position
    undraw();
    // Redraw position
    draw();
    // Undraw piece
    undraw();
    // Redraw piece
    draw();
  /**
   * Handle IO controls
   *
   * @param {Event} input event
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06Tfalse11:09:false59-040
   */
  function control(e) {
    switch (e.keyCode) {
      case 37:
        moveLeft();
        break;
      case 38:
        rotate();
        break;
      case 39:
        moveRight();
        break;
      case 40:
        moveDown();
        break;
    }
  }

  /**
   * Display a upcoming tetromino
   *
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06Tfalse11:09:false36-040
   */
  function displayNext() {
    // Remove current tetromino piece
    miniSquares.forEach((div) => {
      div.classList.remove("tetromino");
    });

    // Redraw upcoming tetromino piece
    upNextTetrominos[nextRandom].forEach((i) => {
      miniSquares[displayIndex + i].classList.add("tetromino");
    });
  }

  // Event listeners
  document.addEventListener("keyup", control);
  startBtn.addEventListener("click", () => {
    if (timerID) {
      clearInterval(timerID);
      timerID = null;
      startBtn.textContent = "Start Game";
    } else {
      draw();
      timerID = setInterval(moveDown, difficulty);
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      startBtn.textContent = "Pause Game";
      displayNext();
    }
  });

  /**
   * Keep track of game score
   *
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06Tfalse11:09:07-040
   */
  function addScore() {
    // Iterate through each grid div
    for (let i = 0; i < squareCount; i ++) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      // Check if tetromino is at the end
      if (row.every(idx => squares[idx].classList.contains("taken") && !squares[idx].classList.contains("immutable"))) {
        score += 10;
        document.querySelector("#score").textContent = score;
        row.forEach(idx => {
          squares[idx].classList.remove("taken", "tetromino");
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell));
      }
    }
  }
/**
 * Append 200 divs to the game grid
 *
 * @param {DOMElement} container
 * @param {integer} number of squares
 * @param {integer} pad the last N elements with class "taken"
 * @return {HTMLCollection} grid children
 * @author Alec M. <https://amattu.com>
 * @date 2021-10-06T09:15:17-040
 */
function buildUIGrids(container, number, pad) {
  // Create a placeholder fragment
  const fragment = document.createDocumentFragment();

  // Create N elements
  for (let i = 0; i < number; i++) {
    const div = document.createElement('div');

    // Add classes to element if needed
    if (pad && i >= pad)
      div.classList.add('taken', 'immutable');

    // Append to fragment
    fragment.appendChild(div);
  }

  // Append fragment to container (grid)
  container.appendChild(fragment);

  // Return children
  return container.children;
}
