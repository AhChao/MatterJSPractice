// Global Settings / Variables
var Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite,
Events = Matter.Events,
BodyM = Matter.Body,
Vertices = Matter.Vertices,
Bounds = Matter.Bounds,
Mouse = Matter.Mouse,
Query = Matter.Query;

var engine;
var render;
var runner;
var ballStatus = 0;
var mainBall;
var mouse;
var blockList = [];
var isZoomIn = false;
const canvasWidth = 400;
const canvasHeigh = 630;
const blockSize = 20;
const mainBallRadius = 15;
const minimumBlockGenerateX = 50;
const minimumBlockGenerateY = 100;
const minimumDistanceBetweenBlocks = 60;
const triggerPlacedAddY = 400;
const totalBallCount = 25;
const blockSeparateX = canvasWidth - minimumBlockGenerateX - 50;
const blockSeparateY = canvasHeigh + triggerPlacedAddY/2 - minimumBlockGenerateY  - 100;
const zoomInDistance = 50;

function insertOverlayDiv()
{
    var overlayDiv = document.createElement("div");
    overlayDiv.id = "overlayDiv";
    overlayDiv.classList.add("overlay");
    document.body.appendChild(overlayDiv);
}

function insertHistoryDiv()
{
    var historyDiv = document.createElement("div");
    historyDiv.id = "historyDiv";
    historyDiv.classList.add("historyDiv");
    document.body.appendChild(historyDiv);
}

function init()
{
    ballStatus = 0;
    engine = Engine.create();
    render = Render.create({
        element: document.body,
        engine: engine,
        options:{
            wireframes:false,
            background: '#bfe9f5', //"#bfe9f5"
            width:canvasWidth,
            height:canvasHeigh,
            hasBounds:true
        }
    });
    mouse = Mouse.create(render.canvas);

    formHiddenWall();
    formMainBall();
    formRandomBlocks(totalBallCount);
    formEndingTrigger();

    Render.run(render);
    runner = Runner.create();
    Events.on(engine, "collisionStart", collisionTriggered);
    Events.on(engine, "afterUpdate", frameUpdated);
}

function reInit()
{
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

function frameUpdated()
{
    var cameraSpeedByFrame = 1.5 * isZoomIn? 0.3 : 1;
    Bounds.translate(render.bounds, {x:0,y:1.5});
    checkClosedToAnyColorBlock(blockList, mainBall);
    mouseEventCheck();
}