var $ = require('../lib/jquery-git.min');
var UI = require('../src/ui');
var GameState = require('../src/GameState');

describe("UI", function() {
  var board = ["X","","","","","","","",""];

  beforeEach(function() {
    ui = new UI();
    game = new GameState();
    jasmine.getFixtures().fixturesPath = '../partials/'
    jasmine.getFixtures().load('game.html', 'menu.html');
  });

  describe("#Game", function(){
    beforeEach(function() {
      ui.showGame();
    });

    it("can show a board", function() {
      ui.showBoard(board);
      expect($("#0")).toHaveText("X");
    });

    it("can listen for a user to click to a spot", function() {
      ui.listenForSpotClick(function(e){$(e.target).html("X")});
      $("#0").trigger("click");
      expect($("#0")).toHaveText("X");
    });

    it("can listen for a user to click play again" ,function() {
      ui.listenForPlayAgainClick(ui.showMenu);
      $("#play-again").trigger("click");
      expect("#menu").toBeVisible();
    });

    it("can disable a spot", function() {
      ui.disableSpots(board);
      expect($("#0")).not.toHaveClass("enabled");
    });

    it("does not enable a spot that contains a marker", function() {
      ui.disableSpots(board);
      ui.enableSpots(board);
      expect($("#0")).not.toHaveClass("enabled");
    });

    it("can enable a spot", function() {
      ui.disableSpots(board);
      ui.enableSpots(board);
      expect($("#1")).toHaveClass("enabled");
    });

    it("can set the turn label if X wins", function() {
      ui.displayWinner("X");
      expect($("#turn-label")).toHaveText("X wins!!");
    });

    it("can set the turn label if O wins", function() {
      ui.displayWinner("O");
      expect($("#turn-label")).toHaveText("O wins!!");
    });

    it("can set the turn label if there's a tie", function() {
      ui.displayTie();
      expect($("#turn-label")).toHaveText("It's a tie!!");
    });

    it("can display the computer's turn", function() {
      ui.displayComputerTurn();
      expect($("#turn-label")).toHaveText("Computer is thinking...");
    });

    it("can display a human's turn", function() {
      ui.displayHumanTurn();
      expect($("#turn-label")).toHaveText("Your turn!");
    })

    it("can disable the play again button", function() {
      ui.disableResetButton();
      expect($("#play-again")).toHaveClass("disabled");
    });

    it("can enable the play again button", function() {
      ui.enableResetButton();
      expect($("#play-again")).not.toHaveClass("disabled");
    });

    it("shows the menu on page load", function() {
      expect($("#menu")).toBeVisible();
    });

    it("can hide the menu", function() {
      ui.hideMenu();
      expect($("#menu")).toBeHidden();
    });

    it("can show the menu", function() {
      ui.hideMenu();
      ui.showMenu();
      expect($("#menu")).toBeVisible();
    });

    it("can show the game", function() {
      ui.showGame();
      expect($("#game")).toBeVisible();
    });

    it("can hide the game", function() {
      ui.showGame();
      ui.hideGame();
      expect($("#game")).toBeHidden();
    });
  });

  describe("#Menu", function(){
    beforeEach(function() {
      ui.showMenu();
    });

    it("can listen for a user to click start game", function() {
      ui.listenForStartGameClicked(function(){ $("#game").show();
});
      $("#start_game").trigger("click");
      expect("#game").toBeVisible();
    });

    it("hides the game on page load", function() {
      expect($("#game")).toBeHidden();
    });

    it ("can show the switch for computer player 1 when it is already selected", function() {
        expect($("#switch1")).toBeHidden();
        $("#computer1").attr('checked',true);
        ui.showSwitch(1);
        expect($("#switch1")).toBeVisible();
    });

    it ("can show the switch for computer player 2 when it is already selected", function() {
        expect($("#switch2")).toBeHidden();
        $("#computer2").attr('checked',true);
        ui.showSwitch(2);
        expect($("#switch2")).toBeVisible();
    });

    it ("can show the switch for computer player 1 when it is changed", function() {
        expect($("#switch1")).toBeHidden();
        ui.showSwitchOnChange(1);
        $("#computer1").attr('checked',true);
        $("#computer1").trigger('change');
        expect($("#switch1")).toBeVisible();
    });

    it ("can hide the switch for computer player 1 when it is changed", function() {
        $("#computer1").attr('checked',true);
        ui.showSwitch(1);
        expect($("#switch1")).toBeVisible();

        ui.showSwitchOnChange(1);
        $("#human1").attr('checked',true);
        $("#human1").trigger('change');
        expect($("#switch1")).toBeHidden();
    });

    it ("can show the switch for computer player 2 when it is changed", function() {
        expect($("#switch2")).toBeHidden();
        ui.showSwitchOnChange(2);
        $("#computer2").attr('checked',true);
        $("#computer2").trigger('change');
        expect($("#switch2")).toBeVisible();
    });

    it ("can hide the switch for computer player 2 when it is changed", function() {
        $("#computer2").attr('checked',true);
        ui.showSwitch(2);
        expect($("#switch2")).toBeVisible();

        ui.showSwitchOnChange(2);
        $("#human2").attr('checked',true);
        $("#human2").trigger('change');
        expect($("#switch2")).toBeHidden();
    });
  });
});
