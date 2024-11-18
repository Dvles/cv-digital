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



// ➔➔ PROJET FILTER TOGGLE 

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
