(function(){
//this contains all the game logic for veletas online
  var canvas = $("#board")[0];
  var ctx = canvas.getContext("2d");
  var nRows = 10;
  var nCols = 10;

  var shooterID = 3;
  var blackID = 1;
  var whiteID = 2;
  var emptyID = 0;

  var boardColor1 = "#ffffff";
  var boardColor2 = "#ffeb3b";
  var whitePieceColor = "#bbdefb"; //Light Green
  var blackPieceColor = "#1976D2"; //Dark Blue
  var shooterPieceColor = "#009688"; //teal

  var squareWidth = canvas.width / nCols;
  var squareHeight = canvas.height / nRows;

  var PieceRadius = Math.min(squareHeight, squareWidth) * 0.45 //padding

  var board = [nRows,nCols];
  var isPlayer1Turn = true;

  var p1 = new HumanPlayer(blackID);
  var p2 = new HumanPlayer(whiteID);

  function HumanPlayer(pieceID){
    this.pieceID = pieceID;
  }
  HumanPlayer.prototype.makeMove = function(){
    awaitBoardClick(function(square){
      placePiece(square,this.PieceID);
      isPlayer1Turn = !isPlayer1Turn;
      if(!isGameOver()) nextTurn();
    });
  }

  function isGameOver(){
    //TODO: this needs game logic
    return false;
  }
  function nextTurn(isPlayer1Turn){
    if(isPlayer1Turn)
      p1.makeMove();
    else
      p2.makeMove();
  }

  function initializeGame(){
    for(var i = 0; i < nRows; i++)
      for(var j = 0; j < nCols; j++){
        board[i,j] = emptyID;
      }
    refresh();
    p1.makeMove();
  }

  function getColor(PieceID){
    switch(PieceID){
      case whiteID: return whitePieceColor; break;
      case blackID: return blackPieceColor; break;
      case shooterID: return shooterPieceColor; break;
      default: return "#000000";
    }
  }

  function refresh(){
    //clear board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    for(var i = 0; i < nRows; i++){
      for(var j = 0; j < nCols; j++){
        drawPiece(i,j,board[i,j]);
      }
    }
  }

  function drawPiece(row, col, Piece){
    if(Piece != emptyID){
      var centerX = row * squareHeight + (squareHeight / 2);
      var centerY = col * squareWidth + (squareWidth / 2);
      ctx.fillStyle = getColor(Piece);
      ctx.beginPath();
      ctx.arc(centerX, centerY, PieceRadius, 0, 2*Math.PI);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawBackground(){
    var altColor = false;
    for(var i = 0; i < nRows; i++){
      for(var j = 0; j < nCols; j++){
        var top = i * squareHeight;
        var left = j * squareWidth;
        ctx.fillStyle = (altColor ? boardColor1 : boardColor2);
        ctx.fillRect(left, top, squareWidth, squareHeight);
        altColor = !altColor;
      }
      altColor = !altColor;
    }
  }

  function placePiece(square,PieceID){
    //TODO: this needs to have game logic
    board[square.row, square.col] = PieceID;
  }

  //get mouseclicks
  function playerClickSquare(row, col){
    console.log(""+row+","+col);
  }

  function eventToSquare(event){
     var c = Math.floor(event.offsetX / squareWidth),
         r = Math.floor(event.offsetY / squareHeight);
    console.log(""+r+","+c);
     return {row:r, col:c};
  }

  function awaitBoardClick(handler){
    canvas.onclick = function(e){
      var square = eventToSquare(e);
      handler(square);
      canvas.onclick = null;
    };
  }

  //canvas.onclick = function(event){
  //  eventToSquare(event);
  //};

  //runs on init
  initializeGame();
})();
