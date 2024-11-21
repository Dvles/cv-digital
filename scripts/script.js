// ➔➔ ISOTOPE.JS 
// external js: isotope.pkgd.js

(function() {
  // Ensure jQuery is loaded before running the code (Remove this if you don't use jQuery)
  if (typeof $ === 'undefined') {
    console.error('jQuery is not loaded!');
    return;
  }

  // Initialize Isotope
  var $table = $('.table-like').isotope({
    layoutMode: 'fitRows', // Updated to fitRows for better stability
    getSortData: {
      name: '.name',
      domain: '.domain',
      level: '.level parseFloat', // Parse float for numerical sorting
    },
  });

  // Debounce function to reduce excessive layout recalculations
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Debounced layout recalculation (Renamed to avoid conflicts)
  const isotopeDebouncedLayout = debounce(() => $table.isotope('layout'), 100);

  // Toggle visibility for graphics summary and detailed view
  function toggleGraphicsDisplay(filters) {
    const graphicsDetailed = $('[data-display-group="graphics-detailed"]');
    const graphicsSummary = $('[data-display-group="graphics-summary"]');

    if (filters.includes('graphics') && filters.length === 1) {
      // Show detailed graphic skills only if 'graphics' is the ONLY active filter
      graphicsDetailed.removeClass('hidden-js').addClass('visible-js');
      graphicsSummary.removeClass('visible-js').addClass('hidden-js');
    } else if (filters.includes('graphics')) {
      // If 'graphics' is one of multiple filters, show summary only
      graphicsDetailed.removeClass('visible-js').addClass('hidden-js');
      graphicsSummary.removeClass('hidden-js').addClass('visible-js');
    } else {
      // Hide all graphics-related items when graphics is not selected
      graphicsDetailed.removeClass('visible-js').addClass('hidden-js');
      graphicsSummary.removeClass('visible-js').addClass('hidden-js');
    }

    // Trigger layout recalculation after visibility changes
    isotopeDebouncedLayout();
  }

  // Filter items on checkbox change
  $('#filters').on('change', 'input[type="checkbox"]', function () {
    var filters = [];
    $('#filters input[type="checkbox"]:checked').each(function () {
      filters.push($(this).val());
    });
    var filterValue = filters.length
      ? filters.map((cat) => `[data-category="${cat}"]`).join(', ')
      : '*';

    // Update Isotope filter
    $table.isotope({ filter: filterValue });

    // Toggle visibility for graphics items
    toggleGraphicsDisplay(filters);
  });

  // Bind sort button click
  $('#sorts').on('click', 'button', function () {
    var sortValue = $(this).attr('data-sort-value');
    if (sortValue === 'level') {
      // If sorting by level, sort in descending order
      $table.isotope({ sortBy: 'level', sortAscending: false });
    } else {
      // For other sorting (name, domain)
      $table.isotope({ sortBy: sortValue });
    }
  });

  // Change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

  // Initial state
  toggleGraphicsDisplay(['web', 'graphics']); // Assume all categories are checked initially
})();




// ➔➔ SCROLL BASED BEHAVIOUR  
console.log(d3.version);
const container = d3.select('#scrolly-side');
const stepSel = container.selectAll('.step');

function updateChart(index) {
  // Update the background color for the active step
  stepSel.classed('is-active', (d, i) => i === index); 
}

function init() {
  enterView({
    selector: stepSel.nodes(),
    offset: 0.5, // Trigger the event when the element is 50% in view
    enter: el => {
      const index = +d3.select(el).attr('data-index'); // Get the index of the step element
      updateChart(index); // Update the step background color
    },
    exit: el => {
      let index = +d3.select(el).attr('data-index'); // Get the index when exiting
      index = Math.max(0, index - 1); // Ensure the index doesn't go below 0
      updateChart(index); // Update the step background color
    }
  });
}

init(); // Initialize the behavior


// ➔➔ PROJECT FILTER TOGGLE 
document.addEventListener("DOMContentLoaded", () => {
    const webFilter = document.querySelector(".web-filter");
    const gfxFilter = document.querySelector(".gfx-filter");
    const allSteps = document.querySelectorAll(".step");

    console.log(webFilter);

    webFilter.addEventListener("click", () => {
        allSteps.forEach(step => {
            if (step.classList.contains("web")) {
                step.classList.remove("hidden");
            } else {
                step.classList.add("hidden");
            }
        });
    });

    gfxFilter.addEventListener("click", () => {
        allSteps.forEach(step => {
            if (step.classList.contains("gfx")) {
                step.classList.remove("hidden");
            } else {
                step.classList.add("hidden");
            }
        });
    });
});
