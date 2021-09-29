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
  let doodler = createDoodler(grid);
  let platforms = createPlatforms(grid, 5);
  let jumpInterval = jump(doodler);
  let moveInterval = setInterval(() => { movePlatforms(platforms, doodler); }, 30);
}

/**
 * Create a doodler jump interval
 *
 * @param {DomElement} doodler
 * @return {IntervalID} setInterval return value
 * @author Alec M. <https://amattu.com>
 * @date 2021-09-29T09:06:04-040
 */
function jump(doodler) {
  let interval = setInterval(() => {
    // Variables
    const bottom = parseInt(doodler.style.bottom.replace("px", "")) + 20;

    // Move doodler up
    doodler.style.bottom = bottom + "px";

    // Move doodler down
    if (bottom > 380) {
      clearInterval(interval);
      fall(doodler);
    }
  }, 30);

  // Return ID
  return interval;
}

function fall(doodler) {
  let interval = setInterval(() => {
    // Variables
    const bottom = parseInt(doodler.style.bottom.replace("px", "")) - 5;

    // Move doodler down
    doodler.style.bottom = bottom + "px";

    // Move doodler down
    if (bottom <= 35) {
      clearInterval(interval);
      jump(doodler);
    }
  }, 30);

  // Return ID
  return interval;
}

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
  let platforms = [];
  let gap = gameHeight / count;

  // Create N platforms
  for (let i = 0; i < count; i++) {
    // Variables
    let bottom = 100 + (i * gap);
    platforms.push(new Platform(grid, bottom));
  }

  // Return platforms variable
  return platforms;
}

/**
 * Move existing platforms downward
 *
 * @param {Array} current platforms
 * @param {DomElement} doodler element
 * @author Alec M. <https://amattu.com>
 * @date 2021-09-29T09:03:03-040
 */
function movePlatforms(platforms, doodler) {
  // Checks
  if (!platforms || !(platforms instanceof Array)) {
    return false;
  }
  if (!doodler || parseInt(doodler.style.bottom.replace("px", "")) <= 200) {
    return false;
  }

  // Move platforms
  platforms.forEach((p) => {
    p.bottom -= 5;
    p.div.style.bottom = p.bottom + "px";
  });
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

class Doodler {

}
