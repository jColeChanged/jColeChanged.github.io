/* Auxillary functions. */
function isPositive(x) {
    return x > 0;
}

function sum(x, y) { 
    return x + y;
}

function isValidMove(board, pos) {
    return 0 <= pos[0] && pos[0] < board.length &&
           0 <= pos[1] && pos[1] < board[0].length;
}

function manhattanDirections() {
    return [[1, 0], [-1, 0], [0, 1], [0, -1]];
}

function getSquareValue(board, pos) {
    var square = board[pos[0]][pos[1]];
    if (square === "P" || square === "E" || square == "") {
        return 0;
    }
    else {
        return square;
    }
}

function contains(moves, mov) {
    return moves.some(function(el, idx, arr) { return el[0] === mov[0] && el[1] === mov[1]; });
}

/* Find moves. */
function getValidMoves(board, pos) {
    // console.debug("?called=getValidMoves&args=", board, pos);
    var positions = [],
        directions = manhattanDirections();
        moves = directions.map(function(dir) { return [pos[0] + dir[0], pos[1] + dir[1]]; }),
        validMoves = moves.filter(function(pos) { return isValidMove(board, pos); });
    return validMoves;
}

function getViewable(board, pos, viewDistance) {
    console.debug("?called=getViewable&distance=viewDistance", viewDistance);
    if (viewDistance == 0) {
        return [];
    }
    else if (viewDistance == 1) {
        return getValidMoves(board, pos);
    }
    else if (viewDistance > 1) {
        var viewableClose = getValidMoves(board, pos),
            viewableFars = viewableClose.map(function(ps) { 
                return getViewable(board, ps, viewDistance - 1); 
            });
        viewableFars.push(viewableClose);
        return _.flatten(viewableFars, true);
    }
}

/* Find positions on the board. */
function getPosition(board, x) {
    for (var i=0; i < board.length; i++) {
        for (var j=0; j < board[i].length; j++) {
            if (board[i][j] === x) {
                return [i, j];
            }
        }
    }
}

function getPlayerPosition(board) {
    // console.debug("?called=getPlayerPosition")
    var position = getPosition(board, "P");
    // console.debug("?called=getPlayerPosition&result=", position);
    return position;
}

function getEndPosition(board) {
    return getPosition(board, "E");
}

function getIndexes(arr_large, arr_i) {
    /* Returns the index of every entry in arr_large which is also in arr_i. */
    var indexes = [];
    for (var i=0; i < arr_large.length; i++) {
        if (contains(arr_i, arr_large[i])) {
            indexes.push(i);
        }
    }
    return indexes;
}

/* Algorithms */
function minimumDistance(allCi, allDi) {    
    // O(n+m) min distance solution
    var bestMerge,
        bestMergeScore = 100000,
        mergeScore,
        ci = 0,
        di = 0,
        lastMergedI,
        lastMerged = "n/a";
        
    while (ci < allCi.length && di < allDi.length) {
        if (allCi[ci] < allDi[di]) {
            if (lastMerged === "di") {
                mergeScore = Math.abs(allCi[ci] - allDi[lastMergedI]);
                if (mergeScore < bestMergeScore) {
                    bestMerge = [ci, lastMergedI];
                    bestMergeScore = mergeScore;
                }
            }
            lastMergedI = ci;
            ci++;
            lastMerged = "ci";
        }
        else {
            if (lastMerged === "ci") {
                mergeScore = Math.abs(allCi[lastMergedI] - allDi[di]);
                if (mergeScore < bestMergeScore) {
                    bestMerge = [lastMergedI, di];
                    bestMergeScore = mergeScore;
                }
            }
            lastMergedI = di;
            di++;
            lastMerged = "di";
        }
    }

    // handle the last merge
    if (allCi.length === ci) {
        mergeScore = Math.abs(allCi[ci-1] - allDi[di]);
        if (mergeScore < bestMergeScore) {
            bestMerge = [ci - 1, di];
        }
    }
    else if (allDi.length === di) {
        mergeScore = Math.abs(allCi[ci] - allDi[di-1]);
        if (mergeScore < bestMergeScore) {
            bestMerge = [ci, di - 1];
        }
    }
    
    return [allCi[bestMerge[0]], allDi[bestMerge[1]]];
}


INIT_POS = [0, 0];

function Player(viewDistance) {
    var self = this;
    this.travelLog = [INIT_POS];
    this.totalScore = 0;
    this.possibleMoves = [];
    this.visible = [];
    this.viewDistance = viewDistance;
    
    this.getVisible = function(board) { 
        self.visible = self.visible.concat(getViewable(board, getPlayerPosition(board), self.viewDistance));
        return self.visible;
    };
    
    this.getPossibleMoves = function(board, pos) {
        // console.debug("?called=getPossibleMoves&args=", board, pos);
        self.possibleMoves = self.possibleMoves.concat(getValidMoves(board, pos));
        // console.debug("?called=getPossibleMoves=", "&moves=", self.possibleMoves); 
        return self.possibleMoves;
    };
    
    this.getRoute = function(board, currentPosition, goalPosition) {
        // console.debug("?called=getRoute&args=", board, currentPosition, goalPosition);
        var destinations = getValidMoves(board, goalPosition);
        if (contains(destinations, currentPosition)) {
            return goalPosition;
        }
        
        // the idea here is to find the route which minimizes the distance that needs to be traveled
        var allDi = getIndexes(self.travelLog, destinations);
        if (allDi.length === 0) {
            throw("No known destinations in getRoute!");
        }
        var allCi = getIndexes(self.travelLog, [currentPosition]);
        if (allCi.length === 0) {
            throw("No known current positions in getRoute!");
        }
        
        var bestMatch = minimumDistance(allCi, allDi);
        var move;
        if (bestMatch[0] < bestMatch[1]) {
            move = self.travelLog[bestMatch[0] + 1];
        }
        else {
            move = self.travelLog[bestMatch[0] - 1];
        }
        return move;
    };
    
    this.rankMove = function(board, pos) {
        var squareValue = getSquareValue(board, pos);
        if (squareValue === 0 && board[pos[0]][pos[1]] === 0) {
            squareValue = 0.99;
        }
        if (squareValue < 0 && self.viewDistance === 2) {
            var notableSquares = getValidMoves(board, pos);
            var certainOpenedWorth = notableSquares.map(function(pos) { return getSquareValue(board, pos); })
                .filter(isPositive)
                .reduce(sum, 0);
            var knownGain = squareValue + certainOpenedWorth;
            if (isPositive(knownGain)) {
                squareValue = 1 - (0.9 / knownGain);
            }
        }
        return squareValue;
    };
    
    this.getMove = function(board, currentPosition) {
        console.debug("?called=getMove&args=", board, currentPosition);
        var moves = self.getPossibleMoves(board, currentPosition);
        if (moves.length === 0) {
            throw("No possible moves found in getMove.");
        }
        var bestMove = moves[0],
            bestMoveRanking = self.rankMove(board, bestMove);
           
        for (var i=0; i < moves.length; i++) {
            var currentRank = self.rankMove(board, moves[i]);
            if (currentRank > bestMoveRanking) {
                bestMove = moves[i];
                bestMoveRanking = currentRank;
            }
        }
        
        var decidedMove;
        if (bestMoveRanking === 0) {
            decidedMove = self.getRoute(board, currentPosition, getEndPosition(board));
        }
        else {
            decidedMove = self.getRoute(board, currentPosition, bestMove);
        }
        console.debug("?called=getMove&res", decidedMove);
        return decidedMove;
    };
    
    this.takeTurn = function(board) { 
        console.debug("?called=takeTurn&arg=", board);
        var currentPosition = getPlayerPosition(board),
            move = self.getMove(board, currentPosition);
            score = getSquareValue(board, move);
        
        self.totalScore += score;
        self.travelLog.push(move);
        
        board[currentPosition[0]][currentPosition[1]] = "";
        board[move[0]][move[1]] = "P";
        console.debug("?called=takeTurn&move=", move);
        return board;
    }
    
    this.getStatistics = function() { 
        return [
            self.totalScore, 
            self.travelLog.length - 1, 
            self.totalScore / (self.travelLog.length - 1)
        ];
    }
    
    return this;
}

// require d3

function generateBoard(x, y) {
    /* Generates an x by y board. This is an array of arrays that will be filled with numbers. */
    var board = [],
        row = null; 
    for (var i=0; i < y; i++) {
        row = [];
        for (var j=0; j < x; j++) {
            row.push(null);            
        }
        board.push(row);
    }
    return board;
}

function logBoard(board) { 
    /* Prints a board to the console. */
    for (var i=0; i < board.length; i++) {
        var row = board[i];
        console.log(row.map(function(i) { return "" + i; }).join(""));
    }
}

function populateBoard(board, populationStrategy) {
    for (var i=0; i < board.length; i++) {
        for (var j=0; j < board.length; j++) {
            board[i][j] = populationStrategy(i, j);
        }
    }
    board[0][0] = "P";
    board[0][1] = "E";
}

function randomStrategy(i, j) {
    /* Return a number between -10 and 10. */

    var zeroToTen = Math.round(Math.random() * 10);
    if (Math.random() < 0.5) {
        return zeroToTen;
    }
    else {
        return -zeroToTen;
    }
}

function update(svg, board, visibles) {
    console.log("?called=update&board=", board, "&svg=", svg, "&visibles=", visibles);
    var cols = board[0].length,
        rows = board.length,
        cellHeight = 20,
        cellWidth = 20,
        cellPadding = 5,
        visibleMap = {},
        xSize = (cellPadding + cellWidth) * cols,
        ySize = (cellPadding + cellWidth) * rows;

          
    if (visibles) {
        visibles.map(function(d) {
            visibleMap[d[0] + "," + d[1]] = true;
        });
    }
    
    var cells = [];
    for (var i=0; i < board.length; i++) {
        for (var j=0; j < board[i].length; j++) {
            var visible, textColor = "black";
            // when there is no present visibility strat, everything is visible
            if (!visibles) {
                visible = true;
            }
            else {
                visible = Boolean(visibleMap[i + "," + j]) || board[i][j] === "P" || board[i][j] === "E";
            }
            if (visible && !isNaN(board[i][j])) {
                if (board[i][j] > 0) {
                    textColor = "green";
                }
                else if (board[i][j] < 0) {
                    textColor = "red";
                }
                
            }
            cells.push({
               x: (cellWidth + cellPadding) * j,
               y: (cellHeight + cellPadding) * i,
               width: cellWidth,
               height: cellHeight,
               text: visible ? board[i][j] : "?",
               visible: visible,
               rectColor: "white",
               textColor: textColor
            });
        }
    }
    
    var canvas = d3.select(svg);

    console.log(canvas, svg);
    var gridCells = canvas.selectAll(".gridCell").data(cells);

    gridCells.enter()
        .append("rect")
        .attr("class", "gridCell")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("fill", function(d) { return d.rectColor; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; });

    gridCells.transition()
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("fill", function(d) { return d.rectColor; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; });

    gridCells.exit()
        .remove();
    var gridCellText = canvas.selectAll(".gridCellText").data(cells);
    gridCellText.enter()
        .append("text")
        .attr("class", "gridCellText")
        .attr("x", function(d) { return d.x + d.width / 2; })
        .attr("y", function(d) { return d.y + d.height / 2; })
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", function(d) { return d.textColor; });

    gridCellText
        .attr("fill", function(d) { return d.textColor; })
        .text(function(d) { return d.text });
}


function playRound(id, player, board) {
    console.log("?playRound=started");
    if (board[0][1] !== "P") {
        var board = player.takeTurn(board);
        update(id + "Agent", board, player.getVisible(board));
        var statistics = player.getStatistics();
        d3.select(id + "Score").text(statistics[0]);
        d3.select(id + "Moves").text(statistics[1]);
        d3.select(id + "Average").text(statistics[2]);
    }
}




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
$(document).ready(function() {   
    runSimulation();
});