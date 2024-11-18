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
