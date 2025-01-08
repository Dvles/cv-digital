console.log("(•‿•)");
console.log("Hello IT world");
console.log("Let's work together!");
console.info("AVAILABLE: FROM XX to XX");



// ➔➔ MODAL
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 



// ➔➔ MENU SCROLL HIGHLIGHT

$(document).ready(function () {
  // Cache selectors
  const sections = $('section');
  const menuLinks = $('.menu-layout li a');

  function updateActiveMenuItem() {
    let currentSection = null;

    // Loop through all sections to check if they are in view
    sections.each(function () {
      const sectionTop = $(this).offset().top;
      const sectionBottom = sectionTop + $(this).outerHeight();
      const scrollPosition = $(window).scrollTop() + $(window).height();

      // Check if the section is in view
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        currentSection = $(this).attr('id');
        return false; // Exit loop once we've found the active section
      }
    });

    // Highlight the corresponding menu link
    menuLinks.each(function () {
      const linkHref = $(this).attr('href').substring(1); 
      if (linkHref === currentSection) {
        $(this).parent().addClass('active');  
        $(this).parent().siblings().removeClass('active');  
      }
    });
  }

  // Listen for scroll events
  $(window).on('scroll', function () {
    updateActiveMenuItem();
  });

  // Trigger the function on page load to highlight the active section initially
  updateActiveMenuItem();
});


// ➔➔ PRESENTATION NAME CTA

document.addEventListener("DOMContentLoaded", () => {
  const nameCta = document.querySelector("#name-cta");
  const presentationSection = document.querySelector("#presentation");

  const observerOptions = {
    root: null, // Use the viewport as the root
    threshold: 0.5 // Trigger when 50% of the section is visible
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Section is in view, make #name-cta black
        nameCta.classList.add("active");
      } else {
        // Section is out of view, make #name-cta grey
        nameCta.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(presentationSection);
});

// ➔➔ PRESENTATION SCROLL-SPEED
const aboutText = document.getElementById('about-text');
const highlights = document.getElementById('highlights');

// Scroll event listener
window.addEventListener('scroll', () => {
  // Get the current scroll position
  let scrollPosition = window.scrollY;

  // Adjust scroll speed for about-text (slower)
  let aboutTextSpeed = scrollPosition * 0.4;  // You can adjust this value (slower = smaller multiplier)
  aboutText.style.transform = `translateY(${aboutTextSpeed}px)`;

  // Adjust scroll speed for highlights (faster)
  let highlightsSpeed = scrollPosition * 0.2;  // You can adjust this value (faster = larger multiplier)
  highlights.style.transform = `translateY(${highlightsSpeed}px)`;
});



// ➔➔ EXPERIENCE Scroll TOGGLE for extra-content
document.addEventListener("DOMContentLoaded", () => {
  const experienceItems = document.querySelectorAll('.bio-content');

  experienceItems.forEach(item => {
    const extraContent = item.querySelector('.extra-content');

    item.addEventListener('mouseenter', () => {
      extraContent.classList.add('visible');  // Add the visible class to trigger the transition
    });

    item.addEventListener('mouseleave', () => {
      extraContent.classList.remove('visible');  // Remove the visible class to hide the extra content
    });
  });
});



// ➔➔ EXPERIENCE "See more" TOGGLE for extra-experience
document.addEventListener("DOMContentLoaded", () => {
  const btnSeeMore = document.querySelector("#see-more");
  const btnSeeLess = document.querySelector("#see-less");

  const allExtraExperiences = document.querySelectorAll('.bio-content.extra-experience');

  function showExtraExperiences() {
    allExtraExperiences.forEach(extraExperience => {
      extraExperience.classList.add("visible"); // Add the visible class
    });
  }

  function hideExtraExperiences() {
    allExtraExperiences.forEach(extraExperience => {
      extraExperience.classList.remove("visible"); // Remove the visible class
    });
  }

  btnSeeMore.addEventListener("click", () => {
    showExtraExperiences();
    btnSeeMore.classList.add("hidden");
    btnSeeLess.classList.remove("hidden");
  });

  btnSeeLess.addEventListener("click", () => {
    hideExtraExperiences();
    btnSeeLess.classList.add("hidden");
    btnSeeMore.classList.remove("hidden");
  });
});

// ➔➔ SKILLS Scroll TOGGLE for extra-content
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll('.button'); // Target all buttons
  const filterDetails = document.querySelectorAll('.filter-detail'); // Target all filter-detail sections

  filterButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
          const filterClass = button.classList[1].replace('btn-', 'filter-'); // Map button class to filter class
          filterDetails.forEach(detail => {
              detail.classList.add('hidden'); // Hide all filter details first
              if (detail.classList.contains(filterClass)) {
                  detail.classList.remove('hidden'); // Show only the corresponding filter detail
              }
          });
      });

      button.addEventListener('mouseleave', () => {
          filterDetails.forEach(detail => {
              if (!detail.classList.contains('original')) {
                  detail.classList.add('hidden'); // Re-hide all except the original
              }
          });
      });
  });
});





// ➔➔ Skills detail FILTER TOGGLE
document.addEventListener("DOMContentLoaded", () => {
  // Select the filter detail elements
  const allFilterDetails = document.querySelectorAll(".filter-detail");
  const isDesktop = window.matchMedia("(min-width: 800px)").matches; 

  if (isDesktop){

    // Select the filter buttons
    const btnNameFilter = document.querySelector(".btn-name-filter");
    const btnLevelFilter = document.querySelector(".btn-level-filter");
    const btnDomainFilter = document.querySelector(".btn-domain-filter");
    const btnOriginalFilter = document.querySelector(".btn-original-filter");
  
    // Function to hide all filter details
    function hideAllFilterDetails() {
      allFilterDetails.forEach(filterDetail => {
        filterDetail.classList.add("hidden"); // Add 'hidden' to all filter details
      });
    }
  
    // Add hover event listeners to each button
    const buttonDetailsMap = [
      { button: btnOriginalFilter, detail: document.querySelector("#filter-original") },
      { button: btnNameFilter, detail: document.querySelector("#filter-name") },
      { button: btnDomainFilter, detail: document.querySelector("#filter-domain") },
      { button: btnLevelFilter, detail: document.querySelector("#filter-level") }
    ];
  
    buttonDetailsMap.forEach(({ button, detail }) => {
      button.addEventListener("mouseenter", () => {
        hideAllFilterDetails(); // Hide all other filter details
        detail.classList.remove("hidden"); // Show the corresponding filter detail
      });
  
      button.addEventListener("mouseleave", () => {
        detail.classList.add("hidden"); // Hide the filter detail when mouse leaves
      });
    });

  }
});




// ➔➔ PROJECT FILTER TOGGLE 
document.addEventListener("DOMContentLoaded", () => {
  const webFilter = document.querySelector(".web-filter");
  const gfxFilter = document.querySelector(".gfx-filter");
  const allSteps = document.querySelectorAll(".step");

  // Event listener for Web Filter
  webFilter.addEventListener("change", () => {
    if (webFilter.checked) {
      gfxFilter.checked = false; // Uncheck Gfx filter

      // Show only steps with 'web' class
      allSteps.forEach(step => {
        if (step.classList.contains("web")) {
          step.classList.remove("hidden");
        } else {
          step.classList.add("hidden");
        }
      });

      // Update styles for web filter (checkbox and label)
      webFilter.classList.add("active-filter");
      webFilter.classList.remove("unactive-filter");
      webFilter.closest('label').classList.add("active-filter"); // Add active to the label
      webFilter.closest('label').classList.remove("unactive-filter"); // Remove unactive from the label

      // Update styles for gfx filter (checkbox and label)
      gfxFilter.classList.add("unactive-filter");
      gfxFilter.classList.remove("active-filter");
      gfxFilter.closest('label').classList.add("unactive-filter");
      gfxFilter.closest('label').classList.remove("active-filter");
    }
  });

  // Event listener for Gfx Filter
  gfxFilter.addEventListener("change", () => {
    if (gfxFilter.checked) {
      webFilter.checked = false; // Uncheck Web filter

      // Show only steps with 'gfx' class
      allSteps.forEach(step => {
        if (step.classList.contains("gfx")) {
          step.classList.remove("hidden");
        } else {
          step.classList.add("hidden");
        }
      });

      // Update styles for gfx filter (checkbox and label)
      gfxFilter.classList.add("active-filter");
      gfxFilter.classList.remove("unactive-filter");
      gfxFilter.closest('label').classList.add("active-filter"); // Add active to the label
      gfxFilter.closest('label').classList.remove("unactive-filter"); // Remove unactive from the label

      // Update styles for web filter (checkbox and label)
      webFilter.classList.add("unactive-filter");
      webFilter.classList.remove("active-filter");
      webFilter.closest('label').classList.add("unactive-filter");
      webFilter.closest('label').classList.remove("active-filter");
    }
  });
});






// ➔➔ ISOTOPE.JS 
// external js: isotope.pkgd.js
(function () {
  // Ensure jQuery is loaded before running the code 
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
  var ascending = true; // Default to ascending order

  // Set descending order for specific cases
  if (sortValue === 'level') {
      ascending = false;
  }

  // Update Isotope sorting
  $table.isotope({
      sortBy: sortValue,
      sortAscending: ascending,
  });
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