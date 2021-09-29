// Global configuration
const gameHeight = 600;
var isGameOver = false;

// DOM Event Listener
document.addEventListener("DOMContentLoaded", (e) => {
  // Elements
  const grid = document.querySelector('.grid');

  start(grid);
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
/**
 * Run initial game functions
 *
 * @author Alec M. <https://amattu.com>
 * @date 2021-09-29T08:44:00-040
 */
function start() {
  // Check game status
  if (isGameOver) {
    return false;
  }

  // Start game
  createDoodler();
  createPlatforms();
}
