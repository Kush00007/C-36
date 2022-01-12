class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.posx = 0;
    this.posy = 0;
  }
 readpc()
 {
   database.ref("playerCount").on("value",function(data){
     mypc = data.val()
   })
 }
  updatepc(count)
  {
    database.ref("/").update({
      playerCount:count
    })
  }
  addplayer(){
   var playerIndex = "players/player" + this.index   
    if(this.index === 1)
    {
      this.posx = width/2 - 100
      
    }
    else{
       this.posx = width/2 + 100
    }
    database.ref(playerIndex).set({
      name:this.name,
      positionx:this.posx,
      positiony:this.posy
    })
  }

static getplayerinfo(){
    database.ref("players").on("value",function(data){
      allplayers = data.val()
    })
  }
}
