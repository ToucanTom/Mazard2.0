
// Details on all images used as tiles
// *** Note: Add to bottom of list to not change order
var tileObjects = {
    "blankTile" : {
        image: "Media/blankTile.png",
        north: false,
        east: false,
        south: false,
        west: false
    },
    "startTile" : {
        image: "Media/startingTileOriginal.png",
        north: true,
        east: true,
        south: false,
        west: true
    },
    "east" : {
        image: "Media/east.png",
        north: false,
        east: true,
        south: false,
        west: false
    },
    "eastSouth" : {
        image: "Media/eastSouth.png",
        north: false,
        east: true,
        south: true,
        west: false
    },
    "eastSouthWest" : {
        image: "Media/eastSouthWest.png",
        north: false,
        east: true,
        south: true,
        west: true
    },
    "eastWest" : {
        image: "Media/eastWest.png",
        north: false,
        east: true,
        south: false,
        west: true
    },
    "north" : {
        image: "Media/north.png",
        north: true,
        east: false,
        south: false,
        west: false
    },
    "northEast" : {
        image: "Media/northEast.png",
        north: true,
        east: true,
        south: false,
        west: false
    },
    "northEastSouth" : {
        image: "Media/northEastSouth.png",
        north: true,
        east: true,
        south: true,
        west: false
    },
    "northEastSouthWest" : {
        image: "Media/northEastSouthWest.png",
        north: true,
        east: true,
        south: true,
        west: true
    },
    "northEastWest" : {
        image: "Media/northEastWest.png",
        north: true,
        east: true,
        south: false,
        west: true
    },
    "northSouth" : {
        image: "Media/northSouth.png",
        north: true,
        east: false,
        south: true,
        west: false
    },
    "northSouthWest" : {
        image: "Media/northSouthWest.png",
        north: true,
        east: false,
        south: true,
        west: true
    },
    "northWest" : {
        image: "Media/northWest.png",
        north: true,
        east: false,
        south: false,
        west: true
    },
    "south" : {
        image: "Media/south.png",
        north: false,
        east: false,
        south: true,
        west: false
    },
    "southWest" : {
        image: "Media/southWest.png",
        north: false,
        east: false,
        south: true,
        west: true
    },
    "west" : {
        image: "Media/west.png",
        north: false,
        east: false,
        south: false,
        west: true
    },
    "human" : {
        image: "Media/human.png"
    },
    "elf" : {
        image: "Media/Elf.png"
    },
    "dwarf" : {
        image: "Media/Dwarf.png"
    }
};

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
       hasPlayer
       hasFoe
       blocked
       available
*/
var currentGameBoard = [];

function updateGameBoardTileObject(target , template){
    console.log("updateGameBoardTileObject was called");
    target.image = template.image;
    target.north = template.north;
    target.east = template.east;
    target.south = template.south;
    target.west = template.west;
}
var currentTile =  {
  image: "",
  north: false,
  east: false,
  south:false,
  west: false
};

function selectRandomTile(){
    var randNum = Math.floor(Math.random() * 15) + 2;
    var tileKeys = Object.keys(tileObjects);
    return tileObjects[tileKeys[randNum]];
}

var setClickableTiles = [];