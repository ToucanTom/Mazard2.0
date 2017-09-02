function genGameBoard() {
    var gameBoard = document.getElementById("gameBoard");
    var html = "";

    for (var i = 0; i < gameBoardSize.row; i++) {
        html += "<tr>";
        for (var j = 0; j < gameBoardSize.col; j++) {
            html += "<td id =" + i + "," + j + " style='background-image: url(" + tileObjects.blankTile.image + ")' ></td>"
        }
        html += "</td>";
    }
    gameBoard.innerHTML = html;
}