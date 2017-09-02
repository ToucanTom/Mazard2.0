function genGameBoard() {
    var gameBoard = document.getElementById("gameBoard");
    var html = "";
    var randNum = Math.floor(Math.random()*(gameBoardSize.col-2)) + 1;
    console.log(randNum);
    for (var i = 0; i < gameBoardSize.row; i++) {
        html += "<tr>";
        var temp_array = [];
        for (var j = 0; j < gameBoardSize.col; j++) {
            if (i === gameBoardSize.row-1 && j === randNum) {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects.startTile.image + ")' ></td>";
                temp_array[j] = {hasPlayer: false, hasFoe: false, passable: true, t_object: {image: tileObjects.startTile.image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
            }
            else {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects.blankTile.image + ")' ></td>";
                temp_array[j] = {hasPlayer: false, hasFoe: false, passable: true, t_object: {image: tileObjects.blankTile.image, north: false, east: false, south: false, west: false}};
            }
        }
        html += "</td>";
        currentGameBoard[i] = temp_array;
    }
    gameBoard.innerHTML = html;
}


function genTile(){
    updateGameBoardTileObject(currentTile, selectRandomTile());
    document.getElementById("deck").style.backgroundImage = "url(" + currentTile.image + ")";
    document.getElementById("deck").onclick = "";
    document.getElementById("deck").innerHTML = "";
    genPlacementOptions();
}

function genPlacementOptions() {

}