function collisionTriggered(e)
{
    if(e.name == 'collisionStart' && e.pairs.length > 0)
    {
        if(e.pairs[0].bodyB.label =="EndingBlock") triggerEnding();
        if(e.pairs[0].bodyB.label !="GoldBlock" && e.pairs[0].bodyB.label !="RainbowBlock") return;
        if(e.pairs[0].bodyB.label =="GoldBlock") ballStatus += 1;
        if(e.pairs[0].bodyB.label =="RainbowBlock") ballStatus += 2;
        Composite.remove(engine.world, e.pairs[0].bodyB);
        blockList = blockList.filter(x=>x.id != e.pairs[0].bodyB.id);
    }
    if(ballStatus == 1)
    {
        mainBall.render.fillStyle = "#FFD700";
    }
    if(ballStatus >= 2)
    {
        mainBall.render.fillStyle = "red";
    }
}

function triggerZoomIn()
{
    engine.timing.timeScale = 0.3;
    var mainBallX = mainBall.position.x;
    var mainBallY = mainBall.position.y - render.bounds.min.y;
    var backgroundString = "radial-gradient(10px 10px at " + mainBallX + "px " + mainBallY + "px, transparent 0, transparent 60px, rgba(0, 0, 0, 0.5) 65px)";
    var style = document.getElementById("overlayDiv").style;
    style.background = backgroundString;
    style.display = "block";
}

function triggerZoomOut()
{
    engine.timing.timeScale = 1;
    var style = document.getElementById("overlayDiv").style;
    style.display = "none";
}

function triggerEnding()
{
    var resultString;
    switch (ballStatus)
    {
        case 0 : resultString = "White"; break;
        case 1 : resultString = "Gold"; break;
        case 2 : resultString = "Rainbow"; break;
        default : resultString = "Rainbow"; break;
    }
    alert("Your result is [" + resultString + " Ball] !" );
    var historyDiv = document.getElementById("historyDiv");
    historyDiv.innerHTML = historyDiv.innerHTML + resultString + " Ball" + "<br>"; 
    Events.off(engine, "afterUpdate");
}