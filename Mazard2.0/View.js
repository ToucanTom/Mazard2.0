//lose conditions
    //check for no more path options
        //-use a counter that tracks the number of open paths, maybe uses the check that stage tiles uses
        //-if counter is 0 you lose.
    //player hp = 0 you lose

function genGameBoard() {
    document.getElementById("newLevel").style.display = "none";
    document.getElementById("rotateCCW").style.display = "none";
    document.getElementById("rotateCW").style.display = "none";
    document.getElementById("setRotate").style.display = "none";
    tileCountDown = totalTiles-1;
    var gameBoard = document.getElementById("gameBoard");
    var html = "";

    // Random number generated for random starting location
    var randNum = Math.floor(Math.random()*(gameBoardSize.col-2)) + 1;
    console.log(randNum);
    for (var i = 0; i < gameBoardSize.row; i++) {
        html += "<tr>";
        var temp_array = [];
        for (var j = 0; j < gameBoardSize.col; j++) {

            // Checks to place starting tile in random location on bottom row
            if (i === gameBoardSize.row-1 && j === randNum) {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[1].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, droppedItem: "", connected: false, hasFoe: false, foe: {}, staged: false, blocked: false, available: false, t_object: {image: tileObjects[1].image, north: true, east: true, south: false, west: true}};
                currentPlayer.rowLocation = i;
                currentPlayer.colLocation = j;
            }
            else {
                html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects[0].image + ")' ></td>";
                temp_array[j] = {location: i+","+j, droppedItem: "", connected: false, hasFoe: false, foe: {}, staged: false, blocked: false, available: true, t_object: {image: tileObjects[0].image, north: false, east: false, south: false, west: false}};
            }
            // ****** IF YOU CHANGED THE CREATION OF THE GAME BOARD, UPDATE IN Model.js ******
        }
        html += "</td>";
        currentGameBoard[i] = temp_array;
    }
    gameBoard.innerHTML = html;
    document.getElementById("currentLevel").innerHTML = "Level " + currentLevel;
    if (currentLevel === 1) {
        populatePlayerOptions();
    }
    else {
        document.getElementById(currentPlayer.rowLocation+","+currentPlayer.colLocation).innerHTML = "<img src = "+currentPlayer.image+">";
        document.getElementById("deck").onclick = stageTiles;
    }

}


function populatePlayerOptions(){
    console.log("select race was called");
    var playerOptions = Object.keys(playerObjects);
    var option = document.getElementsByClassName("playerOptions");
    var ids = ["playerOption1Stats","playerOption2Stats","playerOption3Stats"];
    for(var i = 0; i< option.length; i++){
        option[i].innerHTML = "<img class = 'image' src ="+ playerObjects[playerOptions[i]].image + "><div class = 'overlay'  ><div id="+ids[i]+"></div></div>";
    }
    genStats();
}
//these variable names suck
function genStats(){  //this puts the character information into the overlay to show the stats of the player option
    var playerOptions = Object.keys(playerObjects);
    var statsLocations = [document.getElementById("playerOption1Stats"),document.getElementById("playerOption2Stats"),document.getElementById("playerOption3Stats")];
    var statOptions = Object.keys(playerObjects["Human"]);
    for(var i = 0;i<statsLocations.length;i++){
        var html = "";
        for(var j = 0;j<4/*number of stats*/;j++){
            html += "<p>"+statOptions[j+1] + ":"+ playerObjects[playerOptions[i]][statOptions[j+1]]+"</p>";
        }
        statsLocations[i].innerHTML = html;
    }


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
    option[4].style.backgroundImage = "url('Media/key.png')";
    option[4].style.marginTop= "15px";
    option[4].style.paddingTop = "35px";
    option[4].style.paddingLeft = "5px";
    option[4].innerHTML = currentPlayer.keys;
    document.getElementById("gold").innerHTML = currentPlayer.gold;
    if(currentPlayer.hasSword) document.getElementById("sword").style.display = "inline";

}
// places unflipped cards from the deck onto spots surrounding current player
function stageTiles() {

    var setClickableTiles = getSurroundingTiles();
    for (var i = 0; i < setClickableTiles.length; i++) {
        if (setClickableTiles[i].available) { // if not already occupied
            document.getElementById(setClickableTiles[i].location).style.backgroundImage = "url(Media/gameDeck.png)";       // Set background as deck
            currentGameBoard[setClickableTiles[i].location[0]][setClickableTiles[i].location[2]].staged = true;             // update model
            currentGameBoard[setClickableTiles[i].location[0]][setClickableTiles[i].location[2]].available = false;
        }
    }
    // Turn off deck while player chooses a staged tile to be flipped
    document.getElementById("deck").onclick = "";
    document.getElementById("deck").innerHTML = "";
    setOnclickSettings();
}

function genNewLevel() {
    currentLevel++;
    document.getElementById("win").play();
    document.getElementById("newLevel").style.display = "inline";
    document.getElementById("newLevel").innerHTML = "Go to Level " + currentLevel;
    document.getElementById("newLevel").onclick = genGameBoard;
    gameBoardSize.row++;
    totalTiles+=6;
}

/*function flipTile(){
    // updateGameBoardTileObject(currentTile, selectRandomTile());
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

    // Generates appropriate tile for location clicked and sets it to currentTile
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
    //decide if there is a foe
    var randNum = Math.floor((Math.random()*8));
    if (randNum <= 2) {
        currentTile.hasFoe = true;
        currentFoe = foeOptions[randNum];
    }
    // set location of current tile
    currentTile.location = row + "," + col;

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    // something weird is going on here with the true false setting on has foe. im not sure i get it....
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";

    if (currentTile.hasFoe) document.getElementById(row + "," + col).innerHTML = "<img src = " + currentFoe.image + ">";

    currentTile.hasFoe = false;
    /////////////////////////////////////////////////////////////////////////////////
    // Generates rotation buttons to be able to rotate randomly selected tile
    genRotateDivs();

    // Sets all other surrounding tiles to unclickable until you finish rotating the current tile
    clearClickableSettings();

}*/
// used for buttons
function flipTile2(row, col){
    // Checks for clicking vs key presses
    if (col === undefined) {
        row = this.parentNode.rowIndex;
        col = this.cellIndex;
    }

    // flag to inhibit movement
    immobile = true;
    console.log("flipTile2 was called");

    // 20% chance to generate a foe to fight and return to stage tile state if foe generated
    var randNum = Math.floor(Math.random()*100)+1;
    if (randNum <= 33) {
        randNum = Math.floor(Math.random()*100)+1;//reset randNum to be used as the enemy options index
        var index =0;
        if(randNum <= 40) index = 0;
        else if (randNum <= 75) index = 1;
        else index = 2;
        // Show a message that you are about to battle
        document.getElementById("message").innerHTML = "A enemy has spotted you!";
        document.getElementById("message").style.display = "inline";
        document.getElementById("newFoe").style.backgroundImage = "url(" + foeOptions[index].image + ")";
        document.getElementById("newFoe").style.display = "inline";
        // Waits 2 seconds before proceeding with the battle
        setTimeout(function() {battle(foeOptions[index])}, 4000);

        return;
        //currentFoe = foeOptions[randNum];
        //currentTile.hasFoe = true;
    }

    tileCountDown--;

    // FOR NOW - can start new level once last tile is flipped over
    if (tileCountDown === 0) {
        genNewLevel();
    }

    // Now that the tile is flipped, it is no longer staged
    currentGameBoard[row][col].staged = false;

    // Generates appropriate tile for location clicked and sets it to currentTile
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

    // set location of current tile
    currentTile.location = row + "," + col;

    // sets tile background to randomly chosen tile - aka "flips the tile at that location"
    document.getElementById(row + "," + col).style.backgroundImage = "url(" + currentTile.image + ")";

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


    // Update gameboard
    updateGameBoardTileObject(currentGameBoard[currentTile.location[0]][currentTile.location[2]].t_object,currentTile);

    // Allow movement
    immobile = false;

    // Display droppedItem if dropped//////////////////////////
    var rand = Math.floor((Math.random()*100)+1);
    if (items.dropRate >= rand) {
        rand = Math.floor((Math.random()*100)+1);//now that we know we will have an droppedItem we reset the number to anything between 1-100 so that the droppedItem chances are more clear
        var targetElement = currentGameBoard[currentTile.location[0]][currentTile.location[2]];
        if (rand <= 10 && !currentPlayer.hasSword) {//between 1-10 (10% chance)
            //drop sword
            document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.sword.image+">";
            //update gameboard
            targetElement.droppedItem = "sword";
        }
        else if (rand <= 50) {//between 11-50 (40% chance)
            //drop chest or key
            // if rand is even: key
            if(rand%2 === 0){
                document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.key.image+">";
                //update gameboard
                targetElement.droppedItem = "key";
            }
            else{
                document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.chest.image+">";
                //update gameboard
                targetElement.droppedItem = "chest";
            }
            // if rand is odd: chest
        }
        else {//between 51-100 (50% chance)
            //drop bread
            document.getElementById(currentTile.location[0] + "," + currentTile.location[2]).innerHTML = "<img src = "+items.bread.image+">";
            //update gameboard
            targetElement.droppedItem = "bread";
        }


    }
///////////////////////////////////////////////////

    setOnclickSettings();
}

function battle(foeObject) {
    currentFoe.name = foeObject.name;
    currentFoe.hp = foeObject.hp;
    currentFoe.armor = foeObject.armor;
    currentFoe.attack = foeObject.attack;
    currentFoe.gold = foeObject.gold;
    currentFoe.image = foeObject.image;
    document.getElementById("foeBattleStats").innerHTML ="Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack;//either abstract these two lines to their own functions or create a seperate div display for each stat
    document.getElementById("playerBattleStats").innerHTML ="Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack;
    document.getElementById("message").style.display = "none";
    document.getElementById("newFoe").style.display = "none";
    document.getElementById("battle").style.display = "inline";

    document.getElementById("battleEnemy").style.backgroundImage = "url("+foeObject.image+")";
    document.getElementById("battlePlayer").innerHTML = "<img src = "+currentPlayer.image+">";
    document.getElementById("rollButton").onclick = roll;
    document.getElementById("rollButton").style.display ="inline";
}
function roll() {
    var enemyDieRoll = Math.floor((Math.random()*6) + 1); // Random Number between 1 and 6
    var playerDieRoll = Math.floor((Math.random()*6) + 1);

    document.getElementById("enemyDice").innerHTML = "<img src = " + diceOptions[enemyDieRoll-1].image + ">";
    document.getElementById("playerDice").innerHTML = "<img src = " + diceOptions[playerDieRoll-1].image + ">";
    document.getElementById("battleResult").innerHTML ="";

    if (playerDieRoll > currentFoe.armor) {
        // Hit!
        document.getElementById("battleResult").innerHTML = "Player Hit!";
        currentFoe.hp -= currentPlayer.attack;
        if(currentFoe.hp<1) currentFoe.hp = 0;
        document.getElementById("foeBattleStats").innerHTML ="Hp: " + currentFoe.hp +"\nArmor: "+ currentFoe.armor +"\nAttack: "+ currentFoe.attack;
    }
    if(currentFoe.hp <1){
        // Display Exit Battle Button
        document.getElementById("returnButton").style.display = "inline";
        document.getElementById("returnButton").onclick = returnFromBattle;

        // Turn off Roll Button
        //document.getElementById("rollButton").onclick = "";
        document.getElementById("rollButton").style.display ="none";
        document.getElementById("battleResult").innerHTML += "\n\n\nYou beat the " + currentFoe.name + " and claimed " + currentFoe.gold + " gold!";
        currentPlayer.gold += currentFoe.gold;

    }
    else if (enemyDieRoll > currentPlayer.armor) {
        // enemy hit!
        document.getElementById("battleResult").innerHTML += "\n\n\nEnemy Hit...";
        currentPlayer.hp-= currentFoe.attack;
        document.getElementById("playerBattleStats").innerHTML ="Hp: " + currentPlayer.hp +"\nArmor: "+ currentPlayer.armor +"\nAttack: "+ currentPlayer.attack;
        if(currentPlayer.hp < 1){
            returnFromBattle();
        }
    }



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

    // check if battle lowered hp to 0
    if (currentPlayer.hp < 1) {
        document.getElementById("message").innerHTML = "You ded foo";
        document.getElementById("message").style.display = "inline";
        immobile = true;
        clearClickableSettings();
        return;
    }

    // this currently stages all tiles around player even if you haven't staged them previously by clicking deck
    stageTiles();
    immobile = false;
}

// move used as the onclick attribute
function move() {
    if (immobile) {
        return;
    }
    var row = this.parentNode.rowIndex;
    var col = this.cellIndex;
//check to see if their is a chest at current location, if not then remove player image only:
   if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
   else{
       document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
   }
    //update player location to new spot
    currentPlayer.rowLocation = row;
    currentPlayer.colLocation = col;
    var chest = false;
    switch (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem) {
        case("bread"):
            currentPlayer.hp += 1;
            break;
        case("key"):
            //add a key to player inventory
            currentPlayer.keys += 1;
            break;
        case("chest"):
            //if player has a key, open chest, if not.... dont
            if(currentPlayer.keys > 0){
                currentPlayer.keys -= 1;
                currentPlayer.gold += 5;
            }
            else{
                chest = true;
            }

            break;
        case("sword"):
            //add sword to player inventory and add 1 to attack
            currentPlayer.attack += 1;
            currentPlayer.hasSword = true;
            //update player display
            break;
        default:
            //there is no droppedItem, so do nothing
            break;
    }
    updateStats();
    if(!chest) currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem = "";
    document.getElementById(row + "," + col).innerHTML = "<img src = " + currentPlayer.image + ">";
    clearClickableSettings();
    setOnclickSettings();
    document.getElementById("deck").onclick = stageTiles;
}
//move function used as the keydown event listener
function move2(){
    // only run if there isnt a tile being placed
    if(immobile) {
        return;
    }
    console.log("move2 was called");
    var currentSurroundingTiles = getSurroundingTiles();
    var i;
    var keyCode = event.keyCode;
    console.log("the key code is " + keyCode);
    // todo
    // there is a problem with stage tiles if you move using the buttons

    switch (keyCode) {
        // down 's'
        case(83):
        case(40):
            // down ^
            if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].staged) {
                flipTile2(currentPlayer.rowLocation + 1, currentPlayer.colLocation);
            }
            else if (currentGameBoard[currentPlayer.rowLocation + 1][currentPlayer.colLocation].connected) {

                //resets move options now that the player has moved
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else{
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.rowLocation++;
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                document.getElementById("deck").onclick = stageTiles;
            }
            break;
        // right 'D'
        case(68):
        case(39):
            // right >
            if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].staged) {
                flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation + 1);
            }
            else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation + 1].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else{
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.colLocation++;
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                document.getElementById("deck").onclick = stageTiles;
            }
            break;
        // up ^
        case(38):
        case(87):
            // up 'W'
            if (currentGameBoard[currentPlayer.rowLocation - 1][currentPlayer.colLocation].staged) {
                flipTile2(currentPlayer.rowLocation - 1, currentPlayer.colLocation);
            }
            else if (currentGameBoard[currentPlayer.rowLocation - 1][currentPlayer.colLocation].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else{
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.rowLocation--;
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                document.getElementById("deck").onclick = stageTiles;
            }
            break;
        // left <
        case(37):
        case(65):
            // left 'A'
            if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation - 1].staged) {
                flipTile2(currentPlayer.rowLocation, currentPlayer.colLocation - 1);
            }
            else if (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation - 1].connected) {
                for (i = 0; i < currentSurroundingTiles.length; i++) {
                    currentSurroundingTiles[i].connected = false;
                }
                //if there isnt a chest then just move player, otherwise draw the chest again once the player leaves the square
                if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "") document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "";
                else if(currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem === "chest"){
                    document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src ="+items.chest.image +">";
                }
                currentPlayer.colLocation--;
                document.getElementById(currentPlayer.rowLocation + "," + currentPlayer.colLocation).innerHTML = "<img src=" + currentPlayer.image + ">";
                clearClickableSettings();
                setOnclickSettings();
                document.getElementById("deck").onclick = stageTiles;
            }
            break;
    }
    var chest = false;
    switch (currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem) {
        case("bread"):
            //recover health
            currentPlayer.hp += 1;
            break;
        case("key"):
            //add a key to player inventory
            currentPlayer.keys += 1;
            break;
        case("chest"):
            //if player has a key, open chest, if not.... dont
            if(currentPlayer.keys > 0){
                currentPlayer.keys -= 1;
                currentPlayer.gold += 5;
            }else{
                chest = true;
            }

            break;
        case("sword"):
            //add sword to player inventory and add 1 to attack
            currentPlayer.attack += 1;
            currentPlayer.hasSword = true;
            //
            break;
        default:
            //there is no droppedItem, so do nothing
            break;
    }
    updateStats();
    if(!chest) currentGameBoard[currentPlayer.rowLocation][currentPlayer.colLocation].droppedItem = "";
    // update currentConnected[]
    currentConnectedTiles = [];
    getSurroundingTiles();
}

function clearClickableSettings() {
    var cells = document.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].onclick = "";
    }
}

// returns an array of the surrounding tile objects from currentGameBoard
function getSurroundingTiles(){
    var tiles = [];
    var counter = 0;
    var counter2 = 0;
    var row = currentPlayer.rowLocation;
    var col = currentPlayer.colLocation;

    // For North Tile
    if(row-1 >= 0 && currentGameBoard[row][col].t_object.north &&
        (currentGameBoard[row-1][col].available || currentGameBoard[row-1][col].staged || currentGameBoard[row-1][col].t_object.south)) {

        tiles[counter] = currentGameBoard[row-1][col];
        if(currentGameBoard[row-1][col].t_object.south){
            currentGameBoard[row-1][col].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row-1][col].location;
        }
        counter++;
    }

    // For East Tile
    if (col+1 < gameBoardSize.col && currentGameBoard[row][col].t_object.east &&
        (currentGameBoard[row][col+1].available || currentGameBoard[row][col+1].staged || currentGameBoard[row][col+1].t_object.west)) {

        tiles[counter] = currentGameBoard[row][col+1];
        if(currentGameBoard[row][col+1].t_object.west){
            currentGameBoard[row][col+1].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row][col+1].location;
        }
        counter++;
    }

    // For South Tile
    if (row+1 < gameBoardSize.row && currentGameBoard[row][col].t_object.south &&
        (currentGameBoard[row+1][col].available || currentGameBoard[row+1][col].staged || currentGameBoard[row+1][col].t_object.north)) {
        tiles[counter] = currentGameBoard[row+1][col];
        if(currentGameBoard[row+1][col].t_object.north){
            currentGameBoard[row+1][col].connected = true;
            currentConnectedTiles[counter2++] = currentGameBoard[row+1][col].location;
        }
        counter++;
    }

    // For West Tile
    if (col-1 >= 0 && currentGameBoard[row][col].t_object.west &&
        (currentGameBoard[row][col-1].available || currentGameBoard[row][col-1].staged || currentGameBoard[row][col-1].t_object.east)) {
        tiles[counter] = currentGameBoard[row][col-1];
        if(currentGameBoard[row][col-1].t_object.east) {
            currentGameBoard[row][col-1].connected = true;
            currentConnectedTiles[counter2] = currentGameBoard[row][col-1].location;
        }
    }

    return tiles;
}

function setOnclickSettings(){
    var targets = getSurroundingTiles();
    for (var i = 0; i<targets.length; i++){
        if (targets[i].available) {
            document.getElementById("deck").onclick = stageTiles;
        }
        else if(targets[i].staged) {
            document.getElementById(targets[i].location).onclick = flipTile2;
        } else {
            document.getElementById(targets[i].location).onclick = move;
            // document.getElementById(targets[i].location).addEventListener("onkeydown",function (){} );
        }
    }
}

/*/////////Elephant bone yard/////////*/
/* function placeTile() */
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