// external js: isotope.pkgd.js

// Initialize Isotope
var $table = $('.table-like').isotope({
  layoutMode: 'vertical',
  getSortData: {
      name: '.name',
      domain: '.domain',
      level: '.level'
  }
});

// Toggle visibility for graphics summary and detailed view
function toggleGraphicsDisplay(filters) {
  const graphicsDetailed = $('[data-display-group="graphics-detailed"]');
  const graphicsSummary = $('[data-display-group="graphics-summary"]');

  if (filters.includes('graphics') && filters.length === 1) {
      // Show detailed graphic skills only if 'graphics' is the ONLY active filter
      graphicsDetailed.removeClass('hidden-js');
      graphicsSummary.addClass('hidden-js');
  } else if (filters.includes('graphics')) {
      // If 'graphics' is one of multiple filters, show summary only
      graphicsDetailed.addClass('hidden-js');
      graphicsSummary.removeClass('hidden-js');
  } else {
      // Hide all graphics-related items when graphics is not selected
      graphicsDetailed.addClass('hidden-js');
      graphicsSummary.addClass('hidden-js');
  }

  // Trigger layout recalculation after visibility change
  $table.isotope('layout');
}

// Filter items on checkbox change
$('#filters').on('change', 'input[type="checkbox"]', function () {
  var filters = [];
  $('#filters input[type="checkbox"]:checked').each(function () {
      filters.push($(this).val());
  });
  var filterValue = filters.length ? filters.map(cat => `[data-category="${cat}"]`).join(', ') : '*';

  // Update Isotope filter
  $table.isotope({ filter: filterValue });

  // Toggle visibility for graphics items
  toggleGraphicsDisplay(filters);
});

// Bind sort button click
$('#sorts').on('click', 'button', function () {
  var sortValue = $(this).attr('data-sort-value');
  $table.isotope({ sortBy: sortValue });
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
