// script.js
paper.setup('myCanvas');

// Create a raster item:
var raster = new paper.Raster('./assets/pixelcut_transparent.png');

var loaded = false;

raster.on('load', function() {
    console.log('Image loaded');
    loaded = true;
    onResize();
});

raster.visible = false;
var lastPos = paper.view.center;

function moveHandler(event) {
    if (!loaded) return;
    if (lastPos.getDistance(event.point) < 5) return;
    lastPos = event.point;

    var size = this.bounds.size.clone();
    var isLandscape = size.width > size.height;

    size.width = Math.ceil(size.width / (isLandscape ? 2 : 1));
    size.height = Math.ceil(size.height / (isLandscape ? 1 : 2));

    var path1 = new paper.Path.Rectangle({
        point: this.bounds.topLeft,
        size: size,
        onMouseMove: moveHandler
    });
    path1.fillColor = raster.getAverageColor(path1);

    var path2 = new paper.Path.Rectangle({
        point: isLandscape
            ? this.bounds.topCenter
            : this.bounds.leftCenter,
        size: {
            width: Math.floor(size.width),
            height: Math.floor(size.height)
        },
        onMouseMove: moveHandler
    });
    path2.fillColor = raster.getAverageColor(path2);

    this.remove();
}

function onResize(event) {
    if (!loaded) return;
    console.log('Resizing view');
    paper.project.activeLayer.removeChildren();

    paper.view.size = new paper.Size(window.innerWidth, window.innerHeight);

    raster.fitBounds(paper.view.bounds, true);

    new paper.Path.Rectangle({
        rectangle: paper.view.bounds,
        fillColor: raster.getAverageColor(paper.view.bounds),
        onMouseMove: moveHandler
    });
}

window.addEventListener('resize', onResize);
onResize();

function scrollToContent() {
    document.getElementById('mainContent').scrollIntoView({
        behavior: 'smooth'
    });
}

// Array of predefined colors
const colors = ["#f9ffc0", "#79e882cf", "#b7fe88", "#09ff54", "#f3ff86", "#ecff3b"];

// Function to get a random color from the predefined array
function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Change background color on mouse click (only when clicking the body, not the canvas)
document.body.addEventListener('click', function (event) {
    if (event.target.id !== "myCanvas") {
        document.body.style.backgroundColor = getRandomColor();
    }
});

