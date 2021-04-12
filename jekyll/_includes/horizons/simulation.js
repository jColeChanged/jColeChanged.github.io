window.d3VizInits.push(() => quine("horizonSimulation"));

function runSimulation() {
    BOARD_SIZE_X = 10;
    BOARD_SIZE_Y = 10;
    var fullBoard = generateBoard(BOARD_SIZE_X, BOARD_SIZE_Y);
    populateBoard(fullBoard, randomStrategy);

    update("#fullBoard", fullBoard, null);

    var oneSpaceAgent = new Player(1),
        oneSpaceBoard = JSON.parse(JSON.stringify(fullBoard));
    update("#oneSpaceAgent", oneSpaceBoard, oneSpaceAgent.getVisible(oneSpaceBoard));
    setInterval(playRound, 100, "#oneSpace", oneSpaceAgent, oneSpaceBoard);

    var twoSpaceAgent = Player(2),
        twoSpaceBoard = JSON.parse(JSON.stringify(fullBoard));
    update("#twoSpaceAgent", twoSpaceBoard, twoSpaceAgent.getVisible(twoSpaceBoard));
    setInterval(playRound, 100, "#twoSpace", twoSpaceAgent, twoSpaceBoard);
}

window.d3VizInits.push(runSimulation);
