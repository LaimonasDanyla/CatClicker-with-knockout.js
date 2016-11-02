var Cat = function() {
  this.clickCount = ko.observable(0);
  this.name = ko.observable('Tabby');
  this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
  this.imgAttribution = ko.observable('www.flickr.com');

  this.catLevel = ko.computed(function() {
    var clicks = this.clickCount();
    if (clicks <= 10) {
      return "Click level: Low";
    } else if (clicks >= 11 && clicks <= 20) {
      return "Click level: Medium";
    } else {
      return "Click level: High";
    }
  }, this);

  this.nickNames = ko.observableArray(['Kitty', 'Kit-teacup', 'Kittin around', 'Kittles', 'Kitty Kitty']);
  this.addCat = function() {
    this.nickNames.push( $data );
  };
}
//this was causing trouble - bindings are applied via ViewModel
//ko.applyBindings(new Cat());

// --------- one way of making ViewModel---------
/*
var ViewModel = function() {
  this.currentCat = ko.observable ( new Cat() );
  this.incrementCounter = function() {
    //it is not needed anymore to use currentCat() anymore, because using WITH
    //this. represents the currentCat() binding context.
      this.clickCount(this.clickCount() + 1);
    };
  */
// --------anothe way to make ViewModel is with biding is used: --------
// pay attention how outer this is storred to
var ViewModel = function() {
  var self = this; // this is a trick to access inner this and not to confuse
  // with outer this.
  this.currentCat = ko.observable( new Cat() ); // outer this
  this.incrementCounter = function() {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  }
};


ko.applyBindings(new ViewModel());
