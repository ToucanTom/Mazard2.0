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
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[1].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, hasFoe: false, blocked: false, available: false, t_object: {image: tileObjects[1].image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
            }
            else {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[0].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, hasFoe: false, blocked: false, available: true, t_object: {image: tileObjects[0].image, north: false, east: false, south: false, west: false}};
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
    //updateGameBoardTileObject(currentTile, selectRandomTile());
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;

    //  Generates appropriate tile for location clicked and sets it to currentTile
    if (row === currentPlayer.rowLocation-1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("north"));
    }
    if (col === currentPlayer.colLocation+1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("east"));
    }
    if (row === currentPlayer.rowLocation+1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("south"));
    }
    if (col === currentPlayer.colLocation-1) {
        updateGameBoardTileObject(currentTile, selectRandomTile("west"));
    }

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";

    //TODO
    // Call generate rotate div
    genRotateDivs();
    // Sets all other surrounding tiles to unclickable until you finish rotating the current tile
    for (var j = 0; j < setClickableTiles.length; j++) {
        document.getElementById(setClickableTiles[j].location).innerHTML = "";
        document.getElementById(setClickableTiles[j].location).onclick = "";
    }
    setClickableTiles = [];

}

function genRotateDivs() {
    var rotateCCWDiv = document.getElementById("rotateCCW");
    var rotateCWDiv = document.getElementById("rotateCW");

    // Display Box
    rotateCCWDiv.style.display = "inline";
    rotateCWDiv.style.display = "inline";

    // Display Text in Box
    rotateCCWDiv.innerHTML = "Rotate Counter Clockwise";
    rotateCWDiv.innerHTML = "Rotate Clockwise";

    // Set on Click
    rotateCCWDiv.onclick = rotateCCW;
    rotateCWDiv.onclick = rotateCW;
}

function rotateCCW() {

}

function rotateCW() {

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
    document.getElementById("deck").onclick = placeDeck;
    setOnclickSettings();
}
// places unflipped cards from the deck onto spots surrounding current player
function placeDeck() {
    setClickableTiles = getSurroundingTiles();
    for (var i = 0; i < setClickableTiles.length; i++) {
        document.getElementById(setClickableTiles[i].location).style.backgroundImage = "url(Media/meDeck.png)";
        document.getElementById(setClickableTiles[i].location).onclick = genTile;
    }
    document.getElementById("deck").onclick = "";
    document.getElementById("deck").innerHTML = "";
}


//returns an array of the surrounding tile objects from currentGameBoard
function getSurroundingTiles(){
    var tiles = [];
    var counter = 0;
    var row = currentPlayer.rowLocation;
    var col = currentPlayer.colLocation;
    if(row-1 >=0) {
        tiles[counter] = currentGameBoard[row-1][col];
        counter++;
    }
    //else{
    //    tiles[0] = currentTile;
    //}
    if (col+1 < gameBoardSize.col) {
        tiles[counter] = currentGameBoard[row][col+1];
        counter++;
    }
    //else{
    //    tiles[1] = currentTile;
    //}
    if (row+1 < gameBoardSize.row) {
        tiles[counter] = currentGameBoard[row+1][col];
        counter++;
    }
    //else{
    //    tiles[2] = currentTile;
    //}
    if (col-1 >= 0) {
        tiles[counter] = currentGameBoard[row][col-1];
    }
    //else{
    //    tiles[3] = currentTile;
    //}
    return tiles;
}
function setOnclickSettings(){
    var targets = getSurroundingTiles();//get the surrounding tiles
    for (var i =0;i<targets.length;i++){
        if (targets[i].available){//check if there is a tile already placed in each location
            //document.getElementById(targets[i].location).onclick = genTile;
            //document.getElementById(targets[i].location).innerHTML ="click here to generate a new tile";
        }else if ( i === 0 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.north && targets[i].t_object.south){//if there is no tile and there is a connected path onclick = move
            document.getElementById(targets[i].location).onclick = move;
            document.getElementById(targets[i].location).innerHTML ="click to move here";
        }else if ( i === 1 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.east && targets[i].t_object.west){//if there is no tile and there is a connected path onclick = move
            document.getElementById(targets[i].location).onclick = move;
            document.getElementById(targets[i].location).innerHTML ="click to move here";
        }else if ( i === 2 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.south && targets[i].t_object.north){//if there is no tile and there is a connected path onclick = move
            document.getElementById(targets[i].location).onclick = move;
            document.getElementById(targets[i].location).innerHTML ="click to move here";
        }else if ( i === 3 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.east && targets[i].t_object.west){//if there is no tile and there is a connected path onclick = move
            document.getElementById(targets[i].location).onclick = move;
            document.getElementById(targets[i].location).innerHTML ="click to move here";
        }
    }
}
function move() {
console.log("move was called");
}
/*/////////   Elephant bone yard /////////*/
/*function placeTile()*/
 /*{

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
    setOnclickSettings();
    // document.getElementById("deck").innerHTML = "Generate Tile";//this should be in our setOnclickSettings function
    // document.getElementById("deck").onclick = genTile;
}
*/
/*function genPlacementOptions()*/
/*{
    var counter = 0;
    var playerLocationTile = currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation];
    if (currentPlayer.rowLocation-1 >= 0 && playerLocationTile.t_object.north && currentGameBoard[currentPlayer.rowLocation-1][currentPlayer.colLocation].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation-1, y: currentPlayer.colLocation};
        counter++;
    }
    if (currentPlayer.colLocation+1 <= gameBoardSize.col && playerLocationTile.t_object.east && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation+1].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation, y: currentPlayer.colLocation+1};
        counter++;
    }
    if (currentPlayer.rowLocation+1 <= gameBoardSize.row && playerLocationTile.t_object.south && currentGameBoard[currentPlayer.rowLocation+1][currentPlayer.colLocation].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation+1, y: currentPlayer.colLocation};
        counter++;
    }
    if (currentPlayer.colLocation-1 >= 0 && playerLocationTile.t_object.west && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation-1].available) {
        setClickableTiles[counter] = {x: currentPlayer.rowLocation, y: currentPlayer.colLocation-1};
    }
    // IF TILE DOESNT MATCH, GENERATE NEW TILE
    // IF ALL POSSIBLE OUTLETS OF CURRENT TILE NOT AVAILABLE, STOP GENERATING TILES - MUST MOVE CHARACTER
    if (setClickableTiles.length === 0) {
        document.getElementById("deck").innerHTML = "You must move your character to proceed";
    }
    else {
        for (var j = 0; j < setClickableTiles.length; j++) {
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).innerHTML = "Select a path to continue your journey";
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).onclick = genTile;
        }
    }
}*/