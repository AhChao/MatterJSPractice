document.addEventListener('swiped-up', function(e) {
    swipeScreen("up");
});
document.addEventListener('swiped-down', function(e) {
    swipeScreen("down");
});
document.addEventListener('swiped-left', function(e) {
    swipeScreen("left");
});
document.addEventListener('swiped-right', function(e) {
    swipeScreen("right");
});

function swipeScreen(side)
{
    gravityChange(side);
}

function gravityChange(side)
{
    switch(side)
    {
        case "up":
            engine.gravity.x = 0;
            engine.gravity.y = -1;
            return;
        case "down":
            engine.gravity.x = 0;
            engine.gravity.y = 1;
            return;
        case "left":
            engine.gravity.x = -1;
            engine.gravity.y = 0;
            return;
        case "right":
            engine.gravity.x = 1;
            engine.gravity.y = 0;
            return;
    }

}