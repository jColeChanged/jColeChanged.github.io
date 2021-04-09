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
    

    
    var canvas = d3.select(svg).attr({width: xSize, height: ySize});


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