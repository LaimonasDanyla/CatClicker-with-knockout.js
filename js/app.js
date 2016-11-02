var initialCats = [
  {
    clickCount : 0,
    name : 'Tabby',
    imgSrc : 'img/434164568_fea0ad4013_z.jpg',
    imgAttribution : 'www.flickr.com/photos/bigtallguy/434164568',
    nickNames : ['Kitty', 'Kit-teacup', 'Kittin around', 'Kittles', 'Kitty Kitty']
  },
  {
    clickCount : 0,
    name : 'Tiger',
    imgSrc : 'img/4154543904_6e2428c421_z.jpg',
    imgAttribution : 'www.flickr.com/photos/xshamx/4154543904',
    nickNames : ['Tigger']
  },
  {
    clickCount : 0,
    name : 'Scaredy',
    imgSrc : 'img/22252709_010df3379e_z.jpg',
    imgAttribution : 'www.flickr.com/photos/kpjas/22252709',
    nickNames : ['Casper']
  },
  {
    clickCount : 0,
    name : 'Shadow',
    imgSrc : 'img/1413379559_412a540d29_z.jpg',
    imgAttribution : 'www.flickr.com/photos/malfet/1413379559',
    nickNames : ['Shooby']
  },
  {
    clickCount : 0,
    name : 'Sleepy',
    imgSrc : 'img/9648464288_2516b35537_z.jpg',
    imgAttribution : 'www.flickr.com/photos/onesharp/9648464288',
    nickNames: ['Zzzzz']
  }
];

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

  // make observable array for the initial cats, but not passing in yet
  this.catList = ko.observableArray([]);

  //loop over all initialCats, and for each cats, put in to the catList

  initialCats.forEach(function(catItem){
    // pass in each of the catItem, not object literal as previously
    self.catList.push( new Cat(catItem) );
    //self. cat list is used, not this, in order not to confuse where this
    // function is mapping to. SELF is always gonna map to ViewModel.
    //So self.catList will map to this.catList = ko.observableArray([]).
  })

  //changed currentCat - in this way it will not create a new cat here,
  // it is done by forEach function above
  // we need to access the 0th elemnet in the catList (first cat)
  this.currentCat = ko.observable( this.catList()[0] );

  this.incrementCounter = function() {
    self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  }
};


ko.applyBindings(new ViewModel());
