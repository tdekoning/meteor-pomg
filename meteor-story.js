if (Meteor.isClient) {

  // ULTIMATE POMG!
  // TODO: Locatie muis uitlezen
  // TODO: Bal stuiter dingen
  // TODO: Veld maken
  // TODO: google account inloggen
  // TODO: Mensen kunnen joinen

  // EXTRA DINGEN!
  // TODO: Meerdere kanten voor X aantal spelers.
  // TODO: Elke 4 spelers, bal++

  // Super pro mode: rugby bal

  var currentPlayer;


  Template.pongfield.helpers({
    players: function() {
      return Players.find();
    }
  });

  function getPlayerByUserName( userName ) {
    return Players.findOne({name: userName});
  }

  Template.pongfield.rendered = function() {

    $('body').on('keydown', function( event ) {
      console.log(event);
      if( event.keyCode === 38 ) {
        // UP!
        currentPlayer.position.y = Math.max(0, currentPlayer.position.y - 5);
      }

      if( event.keyCode === 40 ) {
        // DOWN!
        currentPlayer.position.y = Math.min(100, currentPlayer.position.y + 5);
      }
      Players.update(currentPlayer._id, currentPlayer);
    });
  };

  Deps.autorun(function(){
    if(Meteor.userId()){
      if(!Meteor.user()) {
        return;
      }

      var username = Meteor.user().profile.name;

      if( Players.find({name: username}).count() > 0 ) {
        // Player is already registered.
        currentPlayer = getPlayerByUserName(username);
        return;
      }
      Players.insert({name: Meteor.user().profile.name, id: Meteor.user._id, position: {x: 0, y: 20}});
      currentPlayer = getPlayerByUserName(Meteor.user().profile.name);
    }
  });

  Template.ball.helpers({
    ball: function() {
      return Balls.findOne();
    }
  });



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var ballProperties = {
      velocity: {
        x: 1,
        y: 1
      }
    };
    
    Players.remove();
    castrate();

    Balls.insert({
      position: {
        x: 40,
        y: 70
      }
    });

    function ball() {
      var ball = Balls.findOne();
      Meteor.setInterval(function() {
        ball.position.x += ballProperties.velocity.x;
        ball.position.y += ballProperties.velocity.y;
        if(ball.position.x >= 90 || ball.position.x <= 10) {
          ballProperties.velocity.x *= -1;
        }

        if(ball.position.y >= 90 || ball.position.y <= 10) {
          ballProperties.velocity.y *= -1;
        }
        Balls.update(ball._id, ball);
      }, 100);
    }
    ball();
  });

  function castrate() {
    Balls.remove(); // ouch
  }
}
