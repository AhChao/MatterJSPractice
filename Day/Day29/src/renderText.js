//refer to https://github.com/liabru/matter-js/issues/321
function renderText()
{
    var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
    if(!ctx) return;
    for(var elementId in engine.world.bodies)
    {
        var targetBody = engine.world.bodies[elementId];
        if(!Number(targetBody.label)) continue;
        if(targetBody.render.text)
        {
            var fontsize = 20;
            var fontfamily = "Arial"; 
            var color = "#EEEEEE";
            fontsize = targetBody.circleRadius;
                
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            ctx.fillStyle=color;
            ctx.font = fontsize + 'px '+fontfamily;
            ctx.fillText(targetBody.render.text,targetBody.position.x,targetBody.position.y);
        }
    }   
}
