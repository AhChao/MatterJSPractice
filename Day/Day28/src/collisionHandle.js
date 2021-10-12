function collisionTriggered(e)
{
    if(e.name == 'collisionStart' && e.pairs.length > 0)
    {
        if(e.pairs[0].bodyA.label != e.pairs[0].bodyB.label) return;
        ballCollision(e.pairs[0].bodyA.label, e.pairs[0].bodyA.id, e.pairs[0].bodyB.id);
    }
}