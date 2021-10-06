/**
 * Author: Alec K. Mattu
 * Date: 2021-10-06
 */

async function setup() {
  /**
   * API Endpoint
   *
   * @type {string}
   */
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

  /**
   * API Search Request
   *
   * @type {Object}
   */
  let request = await fetch(endpoint);

  /**
   * API Search Result
   *
   * @type {Object}
   */
  let data = await request.json();

  /**
   * Query Result Table
   *
   * @type {DOMElement}
   */
  const table = document.querySelector("#result-table");

  /**
   * Query Result Table tbody
   *
   * @type {DOMElement}
   */
  const tableResults = document.querySelector("#result-table-results");

  /**
   * Query No Results Notice
   *
   * @type {DOMElement}
   */
  const noResults = document.querySelector("#no-results");

  /**
   * Search Query Form
   *
   * @type {DOMElement}
   */
  const searchForm = document.querySelector("#search-form");

  /**
   * Search Query Term Input
   *
   * @type {DOMElement}
   */
  const searchTerm = document.querySelector("#search-term");

  /**
   * Find search result matches by term
   *
   * @param {Object} Firing event
   * @param {Object} Search Data
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06T12:11:26-040
   */
  function findMatches(e, data = []) {
    // Validate input
    if (searchTerm.value.length <= 2)
      return;

    // Variables
    const query = searchTerm.value.toLowerCase(); // Case insensitive
    const basis = document.querySelector('input[name="search_type"]:checked').value;
    let results = [];

    // Compare against Zip/Name
    data.forEach((d) => {
      if (basis === "name" && d.name.toLowerCase().includes(query)) {
        results.push(d);
        return; // Skip next IF-stmt for efficiency
      }
      if (basis === "zip" && d.zip.includes(query)) {
        results.push(d);
      }
    });

    // Build UI with results
    buildResultUI(results);
  }

  // Event Listeners
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    findMatches(e, data);
  };
  searchTerm.onkeyup = (e) => findMatches(e, data);
}

// Load API data automatically
window.onload = (e) => setup();
