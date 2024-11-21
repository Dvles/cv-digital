// external js: isotope.pkgd.js

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

// Debounced layout recalculation
const debouncedLayout = debounce(() => $table.isotope('layout'), 100);

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
  debouncedLayout();
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
