var updateQueue = [];

let lastTick = new Date;
let ticksPerSecond = 0;

let pauseSimulation = false;
let stepSimulation = false;
let updates;
let maxUpdatesInitial = 10000;
let maxUpdates = maxUpdatesInitial;
let debug = false;


function tick() {
    const start = new Date;
    updates = 0;

    while(updateQueue.length > 0 && updates < maxUpdates && (!pauseSimulation || stepSimulation)) {
        updateQueue.splice(0,1)[0]();
        ++updates;
        stepSimulation = false;
    }

    if (stepSimulation) {
        notifications.push("Debug: No more updates!");
        stepSimulation = false;
    }

    // randomize max updates, so that flickering wires will flicker on screen as their value will be different each tick
    // due to different max updates
    maxUpdates = maxUpdatesInitial + Math.floor(Math.random() * Math.floor(100)) - 50;

    ticksPerSecond = 1000 / (new Date - lastTick);
    lastTick = new Date;
}

setInterval(tick);


// 500ms : 1:39
// 250ms : 56
