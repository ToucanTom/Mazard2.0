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
    selectRace();
}
function selectRace(){
    console.log("select race was called");
    var playerOptions = Object.keys(playerObjects);
    var option = document.getElementsByClassName("playerOptions");
    for(var i = 0; i< option.length; i++){
        option[i].innerHTML = "<img src ="+ playerObjects[playerOptions[i]].image + ">";
        //option[i].onclick = choosePlayer(playerObjects[playerOptions[i]]);
    }
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

function choosePlayer(playerChoice) {
    console.log("choosePlayer was called");
    currentPlayer.race = playerChoice.race;
    currentPlayer.image = playerChoice.image;
    currentPlayer.attack = playerChoice.attack;
    currentPlayer.armor = playerChoice.armor;
    currentPlayer.hp = playerChoice.hp;
}