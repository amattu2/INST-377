  let squares = Array.from(buildUIGrids(grid, squareCount, squareCount - 10));
  let miniSquares = Array.from(buildUIGrids(miniGrid, 20, 0));
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
