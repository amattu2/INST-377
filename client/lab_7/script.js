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
   * Map Marker Elements
   *
   * @type {Array}
   */
  let markers = [];

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
    const coords = [];

    // Build Result Rows
    (results || []).splice(0, 4).forEach((resturant) => {
      // Variables
      const tr = document.createElement('tr');

      // Attributes
      tr.innerHTML = `<td>${resturant.name.toUpperCase()}</td>`
        .replace(regex, "<b class='has-background-info'>" + term.toUpperCase() + "</b>");

      // Append
      fragment.appendChild(tr);
      coords.push([resturant.name.toUpperCase(), resturant.geocoded_column_1.coordinates]);
    });

    // Append
    tableResults.innerHTML = "";
    tableResults.appendChild(fragment);

    // Update Map
    buildMarkers(coords);
  }

  /**
   * Build the map with locations specified
   *
   * @param {Array} [locations=[]]
   * @author Alec M. <https://amattu.com>
   * @date 2021-10-14T08:false16:false27-040
   */
  function buildMarkers(locations = []) {
    // Remove old markers
    markers.forEach((m) => map.removeLayer(m));
    markers = [];

    // Check locations
    if (!locations || locations.length <= 0) {
      map.setView([38.83986, -76.941642], 5);
      return;
    }

    // Add new markers
    locations.forEach((loc) => {
      markers.push(new L.Marker([loc[1][1], loc[1][0]], {draggable: false}).bindPopup(loc[0]).openPopup());
    });
    markers.forEach((m) => map.addLayer(m));

    // Default view
    map.setView([locations[0][1][1], locations[0][1][0]], 12);
  }

  // Event Listeners
  searchForm.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    findMatches(e, data);
  };
  searchTerm.onsubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    findMatches(e, data);
  };
  searchTerm.onkeyup = (e) => findMatches(e, data);

  // Build Map Layer
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYW1hdHR1IiwiYSI6ImNrdWw1eGxheTNldGUydXFsbjBpcm52M28ifQ.vm917QE5p4Dk7wvHRRLwUw'
  }).addTo(map);
  map.setView([38.83986, -76.941642], 5);
}

// Load API data automatically
window.onload = (e) => setup();
