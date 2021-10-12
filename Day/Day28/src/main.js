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
const canvasWidth = 600;
const canvasHeight = 600;
const wallThickness = 30;

function init()
{
    // create an engine
    engine = Engine.create();
    // create a renderer
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            background: '#FEFAE0',
            hasBounds: true,
            showBounds:false,
            enabled: true,
            wireframes: false,
            showSleeping: true,
            showStats: false,
            showVelocity: true,
            showCollisions: true,
            showSeparations: true,
            showPositions: true,
            showAngleIndicator: true,
            showIds: true,
        }
    });
    // create two boxes and a ground
    var wallA = Bodies.rectangle(canvasWidth/4, canvasHeight/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(315), render:{fillStyle:"#BC6C25"}});
    var wallB = Bodies.rectangle(canvasWidth*3/4, canvasHeight/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(45), render:{fillStyle:"#DDA15E"}});
    var wallC = Bodies.rectangle(canvasWidth/4, canvasHeight*3/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(45), render:{fillStyle:"#283618"}});
    var wallD = Bodies.rectangle(canvasWidth*3/4, canvasHeight*3/4, canvasWidth, wallThickness, { isStatic: true, angle : getRadiusByDegree(315), render:{fillStyle:"#606C38"}});

    // add all of the bodies to the world
    Composite.add(engine.world, [wallA, wallB, wallC, wallD]);
    createBall("down");

    // run the renderer
    Render.run(render);
    // create runner
    runner = Runner.create();
    engine.gravity.scale = 0.0007;
    Events.on(engine, "collisionStart", collisionTriggered);
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
}
init();
