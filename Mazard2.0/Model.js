
// Details on all images used as tiles
var tileObjects = {
    "blankTile" : {
        image: "Media/blankTile.png",
        north: false,
        east: false,
        south: false,
        west: false
    }
};

// Determines visual game board size
var gameBoardSize = {
    row: 6,
    col: 6
};

// TODO
// Find a way to make this dynamically allocated
// JQUERY??
var currentGameBoard = [
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}],
    [{t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false},
        {t_image: tileObjects.blankTile.image, foe_present: false, player_present: false, passable: false, north: false, east: false, south: false, west: false}]
];

function updateGameBoardTileObject(target , template){
    target.image = template.image;
    target.north = template.north;
    target.east = template.east;
    target.south = template.south;
    target.west = template.west;
}