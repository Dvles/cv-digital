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


const greetings = [
    "Hello", "Hola", "Bonjour", "Ciao", "Hallo", "Olá", "Привет", "你好", "こんにちは", "안녕하세요", "Merhaba", "नमस्ते", "01001000 01001001",
    "Sawubona", "Molo", "Jambo", "Salam", "Bawo ni", "Dumela", "Kóyí", "Sannu", "Nnọọ", "Akwabaa", "Mhoro", "Sanibonani",
    "Salut", "Coucou", "Yo", "Hi there!", "Greetings", "Dag", "Gutentag", "Aiya", "01001000 01001001", "Wah Gwaan"
];

const textmoji = [
    "꒰ · ◡ · ꒱", "⊂◉‿◉つ", "ヽ(•‿•)ノ", "（＾ω＾）", "⊂ ◉ ‿ ◉ つ", "｡^‿^｡", "(＊๑˘◡˘)", "ʘ ‿ ʘ", "(ᴗᵔᴥᵔ)", 
    "♡´･ᴗ･`♡", "≧ ◡ ≦", "ʕ·ᴥ·ʔ", "(⊙‿⊙ ✿)", " ヅ ", "❀ ‿ ❀", "✿ ｡ ✿",
"☆(◒‿◒)☆", "( ಠ◡ಠ )","^‿^","(▰˘◡˘▰)", "{◕ ◡ ◕}","｡◕‿◕｡"
];

// Function to generate a random green color
function getRandomGreen() {
    const greenPinkBlackshades = [
        "#90EE90",  // LightGreen
        "#98FB98",  // PaleGreen
        "#A9DFBF",  // LightSeaGreen
        "#B0E57C",  // MediumSpringGreen
        "#7FFF00",  // Chartreuse (light green)
        "#C1E1C1",  // LightMintGreen
        "#32CD32",  // LimeGreen (still light but a little brighter)
        "#FF1493",  // DeepPink (Magenta Pink)
        "#FF69B4",  // HotPink (Magenta Pink)
        "#000000"   // Black
    ];
        return greenPinkBlackshades[Math.floor(Math.random() * greenPinkBlackshades.length)];
}

document.addEventListener('click', function(event) {
    const greeting = greetings[Math.floor(Math.random() * greetings.length)];
    const emoji = textmoji[Math.floor(Math.random() * textmoji.length)];
    const greenColor = getRandomGreen();

    // greeting text
    const greetingText = new paper.PointText({
        point: new paper.Point(Math.random() * paper.view.size.width, Math.random() * paper.view.size.height),
        content: greeting,
        fillColor: 'black',
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 30
    });

    // text moji with random color
    const emojiText = new paper.PointText({
        point: new paper.Point(Math.random() * paper.view.size.width, Math.random() * paper.view.size.height),
        content: emoji,
        fillColor: greenColor,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 40
    });

    // fade-out effects
    greetingText.tween({ opacity: 0 }, 2000);
    emojiText.tween({ opacity: 0 }, 2000);
});


// Let's work CTA
let currentImage = 0;  
document.addEventListener('click', function(event) {
    const mousePosition = new paper.Point(event.clientX, event.clientY);
    
    const imageFile = currentImage === 0 ? './assets/letuscode.png' : './assets/letscode.png';
    
    const image = new paper.Raster(imageFile);
    image.position = mousePosition;
    image.opacity = 0;  
    image.tween({ opacity: 1 }, 5);  
    
    // Toggle between the two images
    currentImage = currentImage === 0 ? 1 : 0;
});

