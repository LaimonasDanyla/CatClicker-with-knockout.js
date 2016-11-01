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


var ViewModel = function() {
  this.currentCat = ko.observable ( new Cat() );
  this.incrementCounter = function() {
      this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    };
}

ko.applyBindings(new ViewModel());
