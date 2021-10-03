var mouseKeepPressed = false;
function getClickedBoxesList()
{
    return Query.point(blockList, {x: mouse.mousedownPosition.x, y: mouse.mousedownPosition.y + render.bounds.min.y});
}

function mouseEventCheck()
{
    var isMousePressed = mouse.button == 0;
    if(isMousePressed && !mouseKeepPressed)
    {
        mouseKeepPressed = true;
        var collissionedList =getClickedBoxesList();
        for(var i in collissionedList) { removeBlocks(collissionedList[i]); }
    }
    else if(!isMousePressed)
    {
        mouseKeepPressed = false;
    }
}