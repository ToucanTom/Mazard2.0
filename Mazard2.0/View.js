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
                temp_array[j] = {location: i+","+j, hasFoe: false, blocked: false, available: false, t_object: {image: tileObjects.startTile.image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
            }
            else {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects.blankTile.image + ")' ></td>";
                temp_array[j] = {hasPlayer: false, hasFoe: false, blocked: false, available: true, t_object: {image: tileObjects.blankTile.image, north: false, east: false, south: false, west: false}};
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
    var ids = ["playerOption1Stats","playerOption2Stats","playerOption3Stats"];
    for(var i = 0; i< option.length; i++){
        option[i].innerHTML = "<img class = 'image' src ="+ playerObjects[playerOptions[i]].image + "><div class = 'overlay' ><div id="+ids[i]+"></div></div>";
    }
    genStats();
}
//these variable names suck
function genStats(){//this puts the character information into the overlay to show the stats of the player option
    var playerOptions = Object.keys(playerObjects);
   var statsLocations = [document.getElementById("playerOption1Stats"),document.getElementById("playerOption2Stats"),document.getElementById("playerOption3Stats")];
 var statOptions = Object.keys(playerObjects["Human"]);
   for(var i = 0;i<statsLocations.length;i++){
       var html = "";
       for(var j = 0;j<4/*number of stats*/;j++){
           html += "<p>"+statOptions[j+1] + ": "+ playerObjects[playerOptions[i]][statOptions[j+1]]+"</p>";
       }
       statsLocations[i].innerHTML = html;
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
    /*var setClickableTiles = [];
    var playerLocationTileKeys = Object.keys(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object);
    var currentTileKeys = ["image", "south", "west", "north", "east"];
    var tileLocations = [currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation], currentGameBoard[currentPlayer.rowLocation-1][currentPlayer.colLocation],
        currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation+1], currentGameBoard[currentPlayer.rowLocation+1][currentPlayer.colLocation], currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation-1]];
    var playerLocationTile = currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation];
    var counter = 0;
    for (var i = 1; i < playerLocationTileKeys.length; i++) {
        if (playerLocationTile.t_object[playerLocationTileKeys[i]] && tileLocations[i].available && currentTile[currentTileKeys[i]]) {
            setClickableTiles[counter] = {x: currentPlayer.rowLocation-1, y: currentPlayer.colLocation};
            counter++;
        }
    }*/
    //var setClickableTiles = [];
    var counter = 0;
    var playerLocationTile = currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation];
    if (currentPlayer.rowLocation-1 >= 0 && playerLocationTile.t_object.north && currentGameBoard[currentPlayer.rowLocation-1][currentPlayer.colLocation].available && currentTile.south) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation-1, y: currentPlayer.colLocation};
        counter++;
    }
    if (currentPlayer.colLocation+1 <= gameBoardSize.col && playerLocationTile.t_object.east && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation+1].available && currentTile.west) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation, y: currentPlayer.colLocation+1};
        counter++;
    }
    if (currentPlayer.rowLocation+1 <= gameBoardSize.row && playerLocationTile.t_object.south && currentGameBoard[currentPlayer.rowLocation+1][currentPlayer.colLocation].available && currentTile.north) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation+1, y: currentPlayer.colLocation};
        counter++;
    }
    if (currentPlayer.colLocation-1 >= 0 && playerLocationTile.t_object.west && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation-1].available && currentTile.east) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation, y: currentPlayer.colLocation-1};
    }
    if (setClickableTiles.length === 0) {
        genTile();
    }
    else {
        for (var j = 0; j < setClickableTiles.length; j++) {
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).innerHTML = "Click here to place";
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).onclick = placeTile;
        }
    }
}
function placeTile() {
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";
    currentGameBoard[row][col].available = false;
    for (var j = 0; j < setClickableTiles.length; j++) {
        document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).innerHTML = "";
        document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).onclick = "";
    }
    setClickableTiles = [];
    document.getElementById("deck").style.backgroundImage = "";
    document.getElementById("deck").innerHTML = "Generate Tile";
    document.getElementById("deck").onclick = genTile;
}
function choosePlayer(playerChoice) {
    console.log("choosePlayer was called");
    currentPlayer.race = playerChoice.race;
    currentPlayer.image = playerChoice.image;
    currentPlayer.attack = playerChoice.attack;
    currentPlayer.armor = playerChoice.armor;
    currentPlayer.hp = playerChoice.hp;
    document.getElementById("playerSelect").style.display = "none"; //remove the player select div
    document.getElementById(currentPlayer.rowLocation+","+currentPlayer.colLocation).innerHTML = "<img src = "+currentPlayer.image+">";
}