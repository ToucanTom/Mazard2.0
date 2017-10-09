////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///TODO
//\GENERAL
//  SHOULD ONLY BE ABLE TO FLIP TILES YOU CAN MOVE TO (NO FLIPPING A STAGED TILE ACROSS A WALL)
//  WIN CONDITION = GEMS
//  MAYBE ROOMS = 100% EVENT(ITEMS OR BATTLE GUARANTEED)
//\ITEMS
//  HEALTH
//  OFFENSIVE
//  DEFENSIVE
//  CHESTS/KEYS
//  UTILITY (DOORS, TOLL TROLLS, EQUIPMENT, ETC...)
//\BATTLES
//  IMAGE SHOULD BE THE SAME AS THE ENCOUNTER ON THE MAP
//  HIT AND MISS SHOULD BE BASED ON ARMOR
//  REWARDS FOR BEATING FOES

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tileBeingPlaced = false;
function genGameBoard() {
    document.getElementById("newLevel").style.display = "none";
    document.getElementById("rotateCCW").style.display = "none";
    document.getElementById("rotateCW").style.display = "none";
    document.getElementById("setRotate").style.display = "none";
    tileCountDown = totalTiles-1;
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
                temp_array[j] = {location: i+","+j, connected: false, hasFoe: false, staged: false, blocked: false, available: false, t_object: {image: tileObjects[1].image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
            }
            else {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[0].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, hasFoe: false, staged: false, blocked: false, available: true, t_object: {image: tileObjects[0].image, north: false, east: false, south: false, west: false}};
            }
        }
        html += "</td>";
        currentGameBoard[i] = temp_array;
    }
    gameBoard.innerHTML = html;
    document.getElementById("currentLevel").innerHTML = "Level " + currentLevel;
    if (currentLevel === 1) {
        selectRace();
    }
    else {
        document.getElementById(currentPlayer.rowLocation+","+currentPlayer.colLocation).innerHTML = "<img src = "+currentPlayer.image+">";
    }

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
function flipTile(){
    //updateGameBoardTileObject(currentTile, selectRandomTile());
    var col = this.cellIndex;
    var row = this.parentNode.rowIndex;

    tileCountDown--;
    if (tileCountDown === 0) {
        currentLevel++;
        document.getElementById("win").play();
        document.getElementById("newLevel").style.display = "inline";
        document.getElementById("newLevel").innerHTML = "Go to Level " + currentLevel;
        document.getElementById("newLevel").onclick = genGameBoard;
        document.getElementById("deck").onclick = stageTiles;
        gameBoardSize.row++;
        totalTiles+=6;
    }

    // sets clicked tile location to unavailable
    currentGameBoard[row][col].available = false;
    currentGameBoard[row][col].staged = false;

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

    var randNum = Math.floor(Math.random()*3);
    if (randNum === 1) {
        currentTile.hasFoe = true;
    }
    // set location of current tile
    currentTile.location = row + "," + col;

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";
    if (currentTile.hasFoe) {
        document.getElementById(row + "," + col).hasFoe = true;
    }
    currentTile.hasFoe = false;

    // Generates rotation buttons to be able to rotate randomly selected tile
    genRotateDivs();

    // Sets all other surrounding tiles to unclickable until you finish rotating the current tile
    clearClickableSettings();

}
//used for buttons
function flipTile2(row, col){
    //updateGameBoardTileObject(currentTile, selectRandomTile());
tileBeingPlaced = true;
console.log("flipTile2 was called");
    tileCountDown--;
    if (tileCountDown === 0) {
        currentLevel++;
        document.getElementById("win").play();
        document.getElementById("newLevel").style.display = "inline";
        document.getElementById("newLevel").innerHTML = "Go to Level " + currentLevel;
        document.getElementById("newLevel").onclick = genGameBoard;
        document.getElementById("deck").onclick = stageTiles;
        gameBoardSize.row++;
        totalTiles+=6;
    }

    // sets clicked tile location to unavailable
    currentGameBoard[row][col].available = false;
    currentGameBoard[row][col].staged = false;

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

    var randNum = Math.floor(Math.random()*3);
    if (randNum === 1) {
        currentTile.hasFoe = true;
    }
    // set location of current tile
    currentTile.location = row + "," + col;

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";
    if (currentTile.hasFoe) {
        document.getElementById(row + "," + col).hasFoe = true;
    }
    currentTile.hasFoe = false;

    // Generates rotation buttons to be able to rotate randomly selected tile
    genRotateDivs();

    // Sets all other surrounding tiles to unclickable until you finish rotating the current tile
    clearClickableSettings();

}
function genRotateDivs() {
    var rotateCCWDiv = document.getElementById("rotateCCW");
    var rotateCWDiv = document.getElementById("rotateCW");
    var setRotateDiv = document.getElementById("setRotate");

    // Display Box
    rotateCCWDiv.style.display = "inline";
    rotateCWDiv.style.display = "inline";
    setRotateDiv.style.display = "inline";

    // Display Text in Box
    rotateCCWDiv.innerHTML = "Rotate Counter Clockwise";
    rotateCWDiv.innerHTML = "Rotate Clockwise";
    setRotateDiv.innerHTML = "Set Rotation";

    // Set on Click
    rotateCCWDiv.onclick = rotateCCW;
    rotateCWDiv.onclick = rotateCW;
    setRotateDiv.onclick = setRotation;
}

function rotateCCW() {
    updateGameBoardTileObject(currentTile, tileObjects[currentTile.rotCCW]);
    document.getElementById(currentTile.location).style.backgroundImage = "url(" + currentTile.image + ")";
}

function rotateCW() {
    updateGameBoardTileObject(currentTile, tileObjects[currentTile.rotCW]);
    document.getElementById(currentTile.location).style.backgroundImage = "url(" + currentTile.image + ")";
}

function setRotation() {

    // Turn off all rotate options and hide boxes
    document.getElementById("rotateCCW").onclick = "";
    document.getElementById("rotateCW").onclick = "";
    document.getElementById("setRotate").onclick = "";
    document.getElementById("rotateCCW").style.display = "none";
    document.getElementById("rotateCW").style.display = "none";
    document.getElementById("setRotate").style.display = "none";

    // Place enemy after rotation set
    if (document.getElementById(currentTile.location).hasFoe === true) {
        document.getElementById(currentTile.location).innerHTML = "<img src = Media/goblin.png>";
    }

    // Update gameboard
    updateGameBoardTileObject(currentGameBoard[currentTile.location[0]][currentTile.location[2]].t_object,currentTile);
    tileBeingPlaced = false;
    // Remove tile
    setOnclickSettings();
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
    document.getElementById("deck").onclick = stageTiles;

    // Visually display characters stats
    updateStats();


}

// Updates players stats
function updateStats() {
    var option = document.getElementsByClassName("playerStats");
    option[0].innerHTML = "<img src = " + currentPlayer.image + ">";
    option[1].innerHTML = "Health: " + currentPlayer.hp;
    option[2].innerHTML = "Attack: " + currentPlayer.attack;
    option[3].innerHTML = "Armor: " + currentPlayer.armor;
}

// places unflipped cards from the deck onto spots surrounding current player
function stageTiles() {

    var setClickableTiles = getSurroundingTiles();
    for (var i = 0; i < setClickableTiles.length; i++) {
        if (setClickableTiles[i].available) {

            document.getElementById(setClickableTiles[i].location).style.backgroundImage = "url(Media/gameDeck.png)";
            document.getElementById(setClickableTiles[i].location).onclick = flipTile;
            currentGameBoard[setClickableTiles[i].location[0]][setClickableTiles[i].location[2]].staged = true;
        }
    }
    document.getElementById("deck").onclick = "";
    document.getElementById("deck").innerHTML = "";
    setOnclickSettings();
}
//returns an array of the surrounding tile objects from currentGameBoard
function getSurroundingTiles(){
    var tiles = [];
    var counter = 0;
    var counter2 = 0;
    var row = currentPlayer.rowLocation;
    var col = currentPlayer.colLocation;

    // For North Tile
    if(row-1 >= 0 && currentGameBoard[row][col].t_object.north && (currentGameBoard[row-1][col].available || currentGameBoard[row-1][col].t_object.south)) {
        tiles[counter] = currentGameBoard[row-1][col];
        if(currentGameBoard[row-1][col].t_object.south){
            currentGameBoard[row-1][col].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row-1][col].location;
        }
        counter++;
    }

    // For East Tile
    if (col+1 < gameBoardSize.col && currentGameBoard[row][col].t_object.east && (currentGameBoard[row][col+1].available || currentGameBoard[row][col+1].t_object.west)) {
        tiles[counter] = currentGameBoard[row][col+1];
        if(currentGameBoard[row][col+1].t_object.west){
            currentGameBoard[row][col+1].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row][col+1].location;
        }
        counter++;
    }

    // For South Tile
    if (row+1 < gameBoardSize.row && currentGameBoard[row][col].t_object.south && (currentGameBoard[row+1][col].available || currentGameBoard[row+1][col].t_object.north)) {
        tiles[counter] = currentGameBoard[row+1][col];
        if(currentGameBoard[row+1][col].t_object.north){
            currentGameBoard[row+1][col].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row+1][col].location;
        }
        counter++;
    }

    // For West Tile
    if (col-1 >= 0 && currentGameBoard[row][col].t_object.west && (currentGameBoard[row][col-1].available || currentGameBoard[row][col-1].t_object.east)) {
        tiles[counter] = currentGameBoard[row][col-1];
        if(currentGameBoard[row][col-1].t_object.east){
            currentGameBoard[row][col-1].connected = true;
            currentConnectedTiles[counter2] = currentGameBoard[row][col-1].location;
        }
    }

    return tiles;
}
function setOnclickSettings(){
    var targets = getSurroundingTiles();//get the surrounding tiles
    for (var i =0;i<targets.length;i++){
        if(targets[i].staged){
            document.getElementById(targets[i].location).onclick = flipTile;
        } else if(targets[i].available){
            document.getElementById("deck").onclick = stageTiles;
        } else{
            document.getElementById(targets[i].location).onclick = move;
           // document.getElementById(targets[i].location).addEventListener("onkeydown",function (){} );
        }
        // if (targets[i].available){//check if there is a tile already placed in each location
        //     document.getElementById("deck").onclick = placeDeck;
        // }else if ( i === 0 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.north && targets[i].t_object.south){//if there is a tile and there is a connected path onclick = move
        //     document.getElementById(targets[i].location).onclick = move;
        //     document.getElementById(targets[i].location).innerHTML ="click to move here";
        // }else if ( i === 1 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.east && targets[i].t_object.west){//if there is a tile and there is a connected path onclick = move
        //     document.getElementById(targets[i].location).onclick = move;
        //     document.getElementById(targets[i].location).innerHTML ="click to move here";
        // }else if ( i === 2 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.south && targets[i].t_object.north){//if there is a tile and there is a connected path onclick = move
        //     document.getElementById(targets[i].location).onclick = move;
        //     document.getElementById(targets[i].location).innerHTML ="click to move here";
        // }else if ( i === 3 && currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].t_object.west && targets[i].t_object.east){//if there is a tile and there is a connected path onclick = move
        //     document.getElementById(targets[i].location).onclick = move;
        //     document.getElementById(targets[i].location).innerHTML ="click to move here";
        // }
    }
}
//move used as the onclick attribute
function move() {
    var row = this.parentNode.rowIndex;
    var col = this.cellIndex;
    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
    currentPlayer.rowLocation = row;
    currentPlayer.colLocation = col;
    if (document.getElementById(row + "," + col).hasFoe === true) {
        battle();
        if (currentPlayer.hp === 0) {
            document.getElementById("message").innerHTML = "YOU DIED";
            document.getElementById("message").style.display = "inline";
        }
    }
    document.getElementById(row + "," + col).innerHTML = "<img src = "+currentPlayer.image+">";
    document.getElementById(row + "," + col).hasFoe = false;
    updateStats();
    clearClickableSettings();
    setOnclickSettings();
    document.getElementById("deck").onclick = stageTiles;
}

function battle() {
    document.getElementById("battle").style.display = "inline";
    document.getElementById("battleEnemy").style.backgroundImage = "url(Media/skeleton.png)";
    document.getElementById("battlePlayer").innerHTML = "<img src = "+currentPlayer.image+">";
    document.getElementById("rollButton").onclick = roll;
}

function roll() {
    var enemyDieRoll = Math.floor(Math.random()*6);
    var playerDieRoll = Math.floor(Math.random()*6);

    document.getElementById("enemyDice").innerHTML = "<img src = " + diceOptions[enemyDieRoll].image + ">";
    document.getElementById("playerDice").innerHTML = "<img src = " + diceOptions[playerDieRoll].image + ">";

    if (playerDieRoll > enemyDieRoll) {
        // You Win!
        document.getElementById("battleResult").innerHTML = "You Win!";
    }
    else {
        // You Lose!
        document.getElementById("battleResult").innerHTML = "You Lose!";
        currentPlayer.hp--;
    }

    // Display Exit Battle Button
    document.getElementById("returnButton").style.display = "inline";
    document.getElementById("returnButton").onclick = returnFromBattle;

    // Turn off Roll Button
    document.getElementById("rollButton").onclick = "";

}

function returnFromBattle() {

    // Clear Return Button, Battle Result Status, and Dice. Return to Game
    document.getElementById("returnButton").onclick = "";
    document.getElementById("returnButton").style.display = "none";
    document.getElementById("battleResult").innerHTML = "";
    document.getElementById("enemyDice").innerHTML = "Enemy's Roll";
    document.getElementById("playerDice").innerHTML = "Player's Roll";
    document.getElementById("battle").style.display = "none";

    // Update Player Stats
    updateStats();
}

//move function used as the keydown event listener
function move2(){
    //only run if there isnt a tile being placed
  if(!tileBeingPlaced) {
    console.log("move2 was called");
    var currentSurroundingTiles = getSurroundingTiles();
    var i;
    var keyCode = event.keyCode;
    console.log("the key code is " + keyCode);
    //todo
    //there is a problem with stage tiles if you move using the buttons

        switch (keyCode) {
            //down 's'
            case(83):
            case(40):
                //down ^
                if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].staged) {
                    flipTile2(currentPlayer.rowLocation + 1, currentPlayer.colLocation);
                }
                else if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].connected) {
                    for (i = 0; i < currentSurroundingTiles.length; i++) {
                        currentSurroundingTiles[i].connected = false;
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                    currentPlayer.rowLocation++;
                    if (document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe === true) {
                        battle();
                        if (currentPlayer.hp === 0) {
                            document.getElementById("message").innerHTML = "YOU DIED";
                            document.getElementById("message").style.display = "inline";
                        }
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe = false;
                    updateStats();
                    clearClickableSettings();
                    setOnclickSettings();
                    document.getElementById("deck").onclick = stageTiles;
                }
                break;
            //right 'D'
            case(68):
            case(39):
                //right >
                if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].staged) {
                    flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation + 1);
                }
                else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].connected) {
                    for (i = 0; i < currentSurroundingTiles.length; i++) {
                        currentSurroundingTiles[i].connected = false;
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                    currentPlayer.colLocation++;
                    if (document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe === true) {
                        battle();
                        if (currentPlayer.hp === 0) {
                            document.getElementById("message").innerHTML = "YOU DIED";
                            document.getElementById("message").style.display = "inline";
                        }
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe = false;
                    updateStats();
                    clearClickableSettings();
                    setOnclickSettings();
                    document.getElementById("deck").onclick = stageTiles;
                }
                break;
            //up ^
            case(38):
            case(87):
                //up 'W'
                if (currentGameBoard[currentPlayer.rowLocation - 1][currentPlayer.colLocation].staged) {
                    flipTile2(currentPlayer.rowLocation - 1, currentPlayer.colLocation);
                }
                else if (currentGameBoard[currentPlayer.rowLocation - 1][currentPlayer.colLocation].connected) {
                    for (i = 0; i < currentSurroundingTiles.length; i++) {
                        currentSurroundingTiles[i].connected = false;
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                    currentPlayer.rowLocation--;
                    if (document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe === true) {
                        battle();
                        if (currentPlayer.hp === 0) {
                            document.getElementById("message").innerHTML = "YOU DIED";
                            document.getElementById("message").style.display = "inline";
                        }
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe = false;
                    updateStats();
                    clearClickableSettings();
                    setOnclickSettings();
                    document.getElementById("deck").onclick = stageTiles;
                }
                break;
            //left <
            case(37):
            case(65):
                //left 'A'
                if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation - 1].staged) {
                    flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation - 1);
                }
                else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation - 1].connected) {
                    for (i = 0; i < currentSurroundingTiles.length; i++) {
                        currentSurroundingTiles[i].connected = false;
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                    currentPlayer.colLocation--;
                    if (document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe === true) {
                        battle();
                        if (currentPlayer.hp === 0) {
                            document.getElementById("message").innerHTML = "YOU DIED";
                            document.getElementById("message").style.display = "inline";
                        }
                    }
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).hasFoe = false;
                    updateStats();
                    clearClickableSettings();
                    setOnclickSettings();
                    document.getElementById("deck").onclick = stageTiles;
                }
                break;
        }

        //update currentConnected[]
        currentConnectedTiles = [];
        getSurroundingTiles();
    }
}

function clearClickableSettings() {
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = "";
    }
}
/*/////////Elephant bone yard/////////*/
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
    // document.getElementById("deck").onclick = flipTile;
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
            document.getElementById(setClickableTiles[j].x + "," + setClickableTiles[j].y).onclick = flipTile;
        }
    }
}*/