class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.posx = 0;
    this.posy = 0;
    this.rank = 0;
    this.score = 0;
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
      posx:this.posx,
      posy:this.posy,
      rank:this.rank,
      score:this.score
    })
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
     });
   }
static getplayerinfo(){
    database.ref("players").on("value",function(data){
      allplayers = data.val()
    })
  }
  updateplayerinfo(){
    var playerIndex = "players/player" + this.index 
    database.ref(playerIndex).update({
      posx:this.posx,
      posy:this.posy,
      rank:this.rank,
      score:this.score
    })
  }
  getDistance(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).on("value",data => {
    var data = data.val()
    this.posx = data.posx;
    this.posy = data.posy; 
    })
  }
}
