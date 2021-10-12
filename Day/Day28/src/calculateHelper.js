function getRadiusByDegree(degree)
{
    return Math.PI / 180 * degree;
}

function getMiddlePlace(pointA,pointB)
{
    return {x: (pointA.x + pointB.x)/2, y: (pointA.y + pointB.y)/2};
}