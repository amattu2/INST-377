/**
 * Author: Alec K. Mattu
 * Date: 2021-10-10
 * Notes:
 *   - The search results don't use pagination, but limit to 26 top results
 *   - This code is HTML/JS injectable by using an unvalidated API
 *   - There's more efficient ways to achieve these results, but I used the simpliest
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
  const request = await fetch(endpoint);

  /**
   * API Search Result
   *
   * @type {Object}
   */
  const data = await request.json();

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
   * Search Map Div
   *
   * @type {LeafletMap}
   */
  const map = L.map('result-map');

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
    if (searchTerm.value.length <= 2) {
      buildResultUI();
      return;
    }

    // Variables
    const query = searchTerm.value.toLowerCase(); // Case insensitive search
    const basis = document.querySelector('input[name="search_type"]:checked').value;
    let results = [];

    // Compare against Zip/Name
    data.forEach((d) => {
      if (basis === "name" && d.name.toLowerCase().includes(query)) {
        results.push(d);
        return;
      }
      if (basis === "zip" && d.zip.includes(query)) {
        results.push(d);
      }
    });

    // Build UI with results
    buildResultUI(results);
  }

  /**
   * Build the result UI section
   *
   * @param {Array} [results=[]]
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-06T13:02:53-040
   */
  function buildResultUI(results = []) {
    // Validate input
    if (!results || !(results instanceof Array) || results.length <= 0) {
      noResults.classList.remove("is-hidden");
      table.classList.add("is-hidden");
    } else {
      noResults.classList.add("is-hidden");
      table.classList.remove("is-hidden");
    }

    // Variables
    const term = searchTerm.value;
    const regex = new RegExp(term, "gi");
    const fragment = document.createDocumentFragment();

    // Build Result Rows
    (results || []).splice(0, 4).forEach((resturant) => {
      // Variables
      const tr = document.createElement('tr');

      // Attributes
      tr.innerHTML = `<td>${resturant.name.toUpperCase()}</td>`
        .replace(regex, "<b class='has-background-info'>" + term.toUpperCase() + "</b>");
      console.log(resturant)

      // Append
      fragment.appendChild(tr);
    });

    // Append
    tableResults.innerHTML = "";
    tableResults.appendChild(fragment);
  }

  // Event Listeners
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    findMatches(e, data);
  };
  searchTerm.onkeyup = (e) => findMatches(e, data);

  // temp
  map.setView([51.505, -0.09], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW1hdHR1IiwiYSI6ImNrdWw1eGxheTNldGUydXFsbjBpcm52M28ifQ.vm917QE5p4Dk7wvHRRLwUw'
  }).addTo(map);
}

// Load API data automatically
window.onload = (e) => setup();
