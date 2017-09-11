
// Details on all images used as tiles
// *** Note: Add to bottom of list to not change order

var tileObjects = [
    {
        name: "blankTile",
        image: "Media/blankTile.png",
        north: false,
        east: false,
        south: false,
        west: false
    },
    {
        name: "startTile",
        image: "Media/startingTileOriginal.png",
        north: true,
        east: true,
        south: false,
        west: true
    },
    {
        name: "east",
        image: "Media/east.png",
        north: false,
        east: true,
        south: false,
        west: false,
        rotCCW: 6,
        rotCW: 14
    },
    {
        name: "eastSouth",
        image: "Media/eastSouth.png",
        north: false,
        east: true,
        south: true,
        west: false,
        rotCCW: 7,
        rotCW: 15
    },
    {
        name: "eastSouthWest",
        image: "Media/eastSouthWest.png",
        north: false,
        east: true,
        south: true,
        west: true,
        rotCCW: 8,
        rotCW: 12
    },
    {
        name: "eastWest",
        image: "Media/eastWest.png",
        north: false,
        east: true,
        south: false,
        west: true,
        rotCCW: 11,
        rotCW: 11
    },
    {
        name: "north",
        image: "Media/north.png",
        north: true,
        east: false,
        south: false,
        west: false,
        rotCCW: 16,
        rotCW: 2
    },
    {
        name: "northEast",
        image: "Media/northEast.png",
        north: true,
        east: true,
        south: false,
        west: false,
        rotCCW: 13,
        rotCW: 3
    },
    {
        name: "northEastSouth",
        image: "Media/northEastSouth.png",
        north: true,
        east: true,
        south: true,
        west: false,
        rotCCW: 10,
        rotCW: 4
    },
    {
        name: "northEastSouthWest",
        image: "Media/northEastSouthWest.png",
        north: true,
        east: true,
        south: true,
        west: true,
        rotCCW: 9,
        rotCW: 9
    },
    {
        name: "northEastWest",
        image: "Media/northEastWest.png",
        north: true,
        east: true,
        south: false,
        west: true,
        rotCCW: 12,
        rotCW: 8
    },
    {
        name: "northSouth",
        image: "Media/northSouth.png",
        north: true,
        east: false,
        south: true,
        west: false,
        rotCCW: 5,
        rotCW: 5
    },
    {
        name: "northSouthWest",
        image: "Media/northSouthWest.png",
        north: true,
        east: false,
        south: true,
        west: true,
        rotCCW: 4,
        rotCW: 10
    },
    {
        name: "northWest",
        image: "Media/northWest.png",
        north: true,
        east: false,
        south: false,
        west: true,
        rotCCW: 15,
        rotCW: 7
    },
    {
        name: "south",
        image: "Media/south.png",
        north: false,
        east: false,
        south: true,
        west: false,
        rotCCW: 2,
        rotCW: 16
    },
    {
        name: "southWest",
        image: "Media/southWest.png",
        north: false,
        east: false,
        south: true,
        west: true,
        rotCCW: 3,
        rotCW: 13
    },
    {
        name: "west",
        image: "Media/west.png",
        north: false,
        east: false,
        south: false,
        west: true,
        rotCCW: 14,
        rotCW: 6
    },
    {
        name: "human",
        image: "Media/human.png"
    },
    {
        name: "elf",
        image: "Media/Elf.png"
    },
    {
        name: "dwarf",
        image: "Media/Dwarf.png"
    }
];
// Determines visual game board size
var gameBoardSize = {
    row: 6,
    col: 6
};
/* List of Race Options */
var playerObjects = {
    "Human" : {
        image: "Media/human.png",
        race : "Human",
        attack: 0,
        hp: 15,
        armor: 1
    },
    "Dwarf" : {
        image: "Media/Dwarf.png",
        race: "Dwarf",
        attack: 0,
        hp: 18,
        armor: 0
    },
    "Elf" : {
        image: "Media/Elf.png",
        race:"Elf",
        attack: 1,
        hp: 15,
        armor: 0
    }
};
/* Current Player Object */
var currentPlayer = {
    image: "",
    race: "",
    hp: 0,
    attack: 0,
    armor: 0,
    rowLocation: 0,
    colLocation: 0
};
/* This is our global game board
    Data Members
        t_object {
           image
           north
           east
           south
           west }
       location
       hasFoe
       blocked
       available
*/
var currentGameBoard = [];
function updateGameBoardTileObject(target , template){
    console.log("updateGameBoardTileObject was called");

    if (target.north === true || target.east === true || target.south === true || target.west === true) {
        target.rotCCW = template.rotCCW;
        target.rotCW = template.rotCW;
    }
    target.image = template.image;
    target.north = template.north;
    target.east = template.east;
    target.south = template.south;
    target.west = template.west;
}
var currentTile =  {
    image: "",
    north: true,
    east: true,
    south: false,
    west: true,
    available: false,
    location:"0,0",
    rotCW: 0,
    rotCCW: 0
};
function selectRandomTile(directionOfSelectedTile){
    var filteredTileKeys = [];
    var index = 0;
    var i = 0;
    switch (directionOfSelectedTile) {
        // IF TILE SELECTED IS NORTH OF THE CURRENT TILE OF THE PLAYER
        case "north":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].south === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        case "east":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].west === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        case "south":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].north === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
        // IF TILE SELECTED IS WEST OF THE CURRENT TILE OF THE PLAYER
        case "west":
            for (i = 2; i < tileObjects.length; i++) {
                if (tileObjects[i].east === true) {
                    filteredTileKeys[index] = tileObjects[i];
                    index++;
                }
            }
            break;
    }
    var randNum = Math.floor(Math.random() * index);
    return filteredTileKeys[randNum];
}
//var setClickableTiles = [];