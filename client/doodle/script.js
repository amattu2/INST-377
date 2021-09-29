document.addEventListener("DOMContentLoaded", (e) => {
  // Elements
  const grid = document.querySelector('.grid');
  const doodler = createDoodler(grid);

});

/**
 * Create a new doodler for the game
 *
 * @param {DOMElement} grid
 * @return {DOMElement} new doodler
 * @author Alec M. <https://amattu.com>
 * @date 2021-09-29T08:33:46-040
 */
function createDoodler(grid) {
  // Checks
  if (!grid) return null;

  // Element
  const div = document.createElement('div');

  // Attributes
  div.classList.add('doodler');
  div.style.left = "50px";
  div.style.bottom = "150px";

  // Insert element
  grid.appendChild(div);

  // Return handle
  return div;
}
