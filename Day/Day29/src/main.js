// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite,
Events = Matter.Events,
Plugins = Matter.Plugins;

var engine;
var render;
var runner;
const canvasWidth = screen.width < 600 ? screen.width : 600 ;
const canvasHeight = screen.width < 600 ? screen.width : 600 ;
const wallThickness = 30;
var score = 0;
var bestScore = localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0;

function runTheRunner()
{
    Runner.run(runner, engine);
}

function stopTheRunner()
{
    Runner.stop(runner, engine);
}

function updateScore(addAmount)
{
    score += addAmount;
    document.getElementById("scoreDisplay").innerHTML = score;
}

function updateBestScore(newBestScore)
{
    bestScore = newBestScore;
    localStorage.setItem('bestScore',bestScore);
    document.getElementById("bestScoreDisplay").innerHTML = bestScore;
}

function init()
{
    score = 0;
    updateScore(0);
    // create an engine
    engine = Engine.create();
    // create a renderer
    render = Render.create({
        element: document.getElementById("canvasPlace"),
        engine: engine,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            background: '#FEFAE0',
            hasBounds: true,
            showBounds:false,
            enabled: true,
            wireframes: false,
            showSleeping: false,
            showStats: false,
            showVelocity: false,
            showCollisions: false,
            showSeparations: false,
            showPositions: false,
            showAngleIndicator: false,
            showIds: false,
        }
    });
    // create two boxes and a ground
    var wallA = Bodies.rectangle(canvasWidth/4, canvasHeight/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(315), render:{fillStyle:"#BC6C25"}, slop: 0});
    var wallB = Bodies.rectangle(canvasWidth*3/4, canvasHeight/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(45), render:{fillStyle:"#DDA15E"}, slop: 0});
    var wallC = Bodies.rectangle(canvasWidth/4, canvasHeight*3/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(45), render:{fillStyle:"#283618"}, slop: 0});
    var wallD = Bodies.rectangle(canvasWidth*3/4, canvasHeight*3/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(315), render:{fillStyle:"#606C38"}, slop: 0});

    // add all of the bodies to the world
    Composite.add(engine.world, [wallA, wallB, wallC, wallD]);
    createBall("down");

    // run the renderer
    Render.run(render);
    // create runner
    runner = Runner.create();
    engine.gravity.scale = 0.0007;
    Events.on(engine, "collisionStart", collisionTriggered);
    Events.on(engine, "afterUpdate", renderText);
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case "ArrowLeft":
                swipeScreen("left");
                break;
            case "ArrowRight":
                swipeScreen("right");
                break;
            case "ArrowUp":
                swipeScreen("up");
                break;
            case "ArrowDown":
                swipeScreen("down");
                break;
        }
    });
    runTheRunner();
}

function retry(){
    event.preventDefault();
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
    init();
}
init();
updateBestScore(bestScore);