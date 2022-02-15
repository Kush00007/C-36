class Game {
  constructor() { 
    this.resetTittle = createElement("h2")
    this.resetButton = createButton("")
    this.leaderBoardTittle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
    }
  readgs() {
    database.ref("gameState").on("value", function (data) {
      mygs = data.val()
    })
  }

  updategs(gs) {
    database.ref("/").update({
      gameState: gs
    })
  }
  start() {

    player = new Player();
    player.readpc();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100)
    car1.addImage(car1img)
    car1.scale = 0.07

    car2 = createSprite(width / 2 + 100, height - 100)
    car2.addImage(car2img)
    car2.scale = 0.07

    cars = [car1, car2]
  }
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTittle.html("RESET")
    this.resetTittle.class("resetText")
    this.resetTittle.position(width/2 + 200 , 40)
    this.resetButton.class("resetButton")
    this.resetButton.position(width/2 + 230 , 100)
    this.leaderBoardTittle.html("Leaderboard")
    this.leaderBoardTittle.class("resetText")
    this.leaderBoardTittle.position(width/3 - 60 , 40)
    this.leader1.class("leadersText")
    this.leader1.position(width/3 - 50 , 80)
    this.leader2.class("leadersText")
    this.leader2.position(width/3 - 50 , 130)
    }
  handleControls() {
    if (keyIsDown(UP_ARROW)) {
      player.posy += 10
      player.updateplayerinfo()
    }
    if(keyIsDown(LEFT_ARROW) && player.posx > width/3 - 50)
    {
      player.posx -= 10
      player.updateplayerinfo()
    }
    if(keyIsDown(RIGHT_ARROW) && player.posx < width/2 + 300)
    {
      player.posx += 10
      player.updateplayerinfo()
    }

  }
  handleReset()
  {
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,
        gameState:0,
        players:{}
      })
      window.location.reload()
    })
  }
  showleaderBoard()
  {
    var leader1 , leader2
    var players = Object.values(allplayers)
    
    if((players[0].rank === 0 && players[1].rank === 0) || players[0].rank === 1)
    {
       leader1 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score
       leader2 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score 
    }
    if(players[1].rank === 1)
    {
      leader1 = players[1].rank + "&emsp;" + players[1].name + "&emsp;" + players[1].score
      leader2 = players[0].rank + "&emsp;" + players[0].name + "&emsp;" + players[0].score 
    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
  play() {
    this.handleElements()
    Player.getplayerinfo()
    this.handleReset()
    if (allplayers !== undefined) {
      image(trackimg, 0, -height * 5, width, height * 6)
      this.showleaderBoard()
      var index = 0
      for (var plr in allplayers) {
        index = index + 1
        var x = allplayers[plr].posx;
        var y = height - allplayers[plr].posy;

        cars[index - 1].position.x = x
        cars[index - 1].position.y = y

        if (index === player.index) {
          stroke(10)
          fill("red")
          ellipse(x, y, 60, 60)

         // camera.position.x = cars[index - 1].position.x
          camera.position.y = cars[index - 1].position.y
          //camera.position.y = cars[index - 1].position.y;


        }
      }
      this.handleControls()
      drawSprites()
    }
  }
}