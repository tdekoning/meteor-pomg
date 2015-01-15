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


  Template.pongfield.helpers({
    players: function() {
      return Players.find();
    }
  });

  /*Template.pongfield.events({
    'keydown .bal': function(event) {
      console.log(event);
    }
  });*/
  Template.pongfield.rendered = function() {
    Players.insert({name: 'player!', position: {x: 0, y: 20}});
    Players.insert({name: 'player!', position: {x: 0, y: 20}});
    $('body').on('keydown', function( event ) {
      console.log(event);
      if( event.keyCode === 38 ) {
        // UP!
      }

      if( event.keyCode === 40 ) {
        // DOWN!
      }
    });
  };

  Template.player.rendered = function() {

  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
