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
  var whitePeiceColor = "#bbdefb"; //Light Green
  var blackPeiceColor = "#1976D2"; //Dark Blue
  var shooterPeiceColor = "#009688"; //teal

  var squareWidth = canvas.width / nCols;
  var squareHeight = canvas.height / nRows;

  var peiceRadius = Math.min(squareHeight, squareWidth) * 0.45 //padding

  var board = [nRows,nCols];

  function initializeGame(){
    for(var i = 0; i < nRows; i++)
      for(var j = 0; j < nCols; j++){
        board[i,j] = emptyID;
      }
    draw()
  }

  function getColor(peiceID){
    switch(peiceID){
      case whiteID: return whitePeiceColor; break;
      case blackID: return blackPeiceColor; break;
      case shooterID: return shooterPeiceColor; break;
      default: return "#000000";
    }
  }

  function draw(){
    //clear board
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawPiece(1,2,blackID);
    drawPiece(5,6,whiteID);
    drawPiece(2,9,shooterID);
  }

  function drawPiece(row, col, peice){
    var centerX = row * squareHeight + (squareHeight / 2);
    var centerY = col * squareWidth + (squareWidth / 2);
    ctx.fillStyle = getColor(peice);
    ctx.beginPath();
    ctx.arc(centerX, centerY, peiceRadius, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();
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


  //runs on init
  initializeGame();
})();
