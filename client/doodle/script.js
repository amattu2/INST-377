// Global configuration
const gameHeight = 600;
var platforms = [];
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
 * Create N platforms for the game
 *
 * @param {DomElement} game container
 * @param {int} number of platforms
 * @author Alec M. <https://amattu.com>
 * @date 2021-09-29T08:40:35-040
 */
function createPlatforms(grid, count = 5) {
  // Checks
  if (!grid) return false;

  // Variables
  let gap = gameHeight / count;

  // Create N platforms
  for (let i = 0; i < count; i++) {
    // Variables
    let bottom = 100 + (i * gap);
    platforms.push(new Platform(grid, bottom));
  }
}

/**
 * Run initial game functions
 *
 * @param {DomElement} game container
 * @author Alec M. <https://amattu.com>
 * @date 2021-09-29T08:44:00-040
 */
function start(grid) {
  // Check game status
  if (isGameOver) {
    return false;
  }

  // Start game
  createDoodler(grid);
  createPlatforms(grid, 5);
}

/**
 * Game platform encapsulator
 */
class Platform {
  /**
   * Class Construct
   *
   * @param {DomElement} parent element
   * @param {int} platform bottom
   * @author Alec M. <https://amattu.com>
   * @date 2021-09-29T08:47:14-040
   */
  constructor(parent, bottom) {
    // Class attributes
    this.bottom = bottom;
    this.left = Math.random() * 315;
    this.div = document.createElement('div');

    // Style element
    this.div.classList.add('platform');
    this.div.style.left = this.left + "px";
    this.div.style.bottom = this.bottom + "px";

    // Append to parent
    parent.appendChild(this.div);
  }
}
}
