
// Details on all images used as tiles
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
    }
};

// Determines visual game board size
var gameBoardSize = {
    row: 6,
    col: 6
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
       passable
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

function genTile(){
    console.log("genTile was called");
    var randNum = Math.floor(Math.random() * 2) + 1;

}