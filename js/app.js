var Cat = function(data) {
  this.clickCount = ko.observable(data.clickCount);
  this.name = ko.observable(data.name);
  this.imgSrc = ko.observable(data.imgSrc);
  this.imgAttribution = ko.observable(data.imgAttribution);

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
  this.currentCat = ko.observable( new Cat({
    clickCount: 0,
    name: 'Tabby',
    imgSrc: 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution: 'www.flickr.com/photos/bigtallguy/434164568',
    nickNames: ['Kitty', 'Kit-teacup', 'Kittin around', 'Kittles', 'Kitty Kitty']
  }) );
  this.incrementCounter = function() {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  }
};


ko.applyBindings(new ViewModel());
