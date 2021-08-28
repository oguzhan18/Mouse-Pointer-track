var gc = new GameCanvas();
var ws = new WebSocket("wss://WebSocket.tc5550.repl.co/");
var data = [];

ws.onopen = function() {
  ws.onmessage = function(msg) {
    var decoded = JSON.parse(msg.data);

    if (decoded.type == "getData") {
      data = decoded.data;
    }
  }
  setInterval(function() {
    ws.send(JSON.stringify({type: "getData"}));
  }, 10);
}
var tick = 0;

function loop() {
  clearScreen();
  
  if (isOpen(ws)) {
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      circle(d.x, d.y, 20, "red","blue");
    }
  }
  else if (ws.readyState === ws.CLOSED) {
    text("DISCONNECTED", width / 2, height / 2, width / 20, "black", {alignText: "center"});
  }
  else {
    text("CONNECTING" + ".".repeat(tick * 0.01 % 4), width / 2, height / 2, width / 20, "black", {alignText: "center"});
  }tick++;}


function OnMouseMove() {
  if (isOpen(ws))
    ws.send(JSON.stringify({type: "setData", data: {x: mouse.x, y: mouse.y}}));
}
function isOpen(ws) {
  return ws.readyState === ws.OPEN;
}