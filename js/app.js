var ViewModel = function() {
    this.clickCount = ko.observable(0);
    //this.name = ko.observable('Tabby');
    this.cats = ko.observableArray([
      { name: 'Kitty' },
      { name: 'Kit-teacup'},
      { name: 'Kittin around'},
      { name: 'Kittles'},
      { name: 'Kitty Kitty'}
    ]);
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('www.flickr.com');

    this.incrementCounter = function() {
      this.clickCount(this.clickCount() + 1);
    };

    this.catLevel = ko.computed(function() {
      if (this.clickCount() <= 10) {
        return "Click level: Small";
      } else if (this.clickCount() >= 11 && this.clickCount() <= 20) {
        return "Click level: Medium";
      } else {
        return "Click level: Big";
      }
    }, this);


    this.addCat = function() {
      self.cats.push({ name });
    }

}

ko.applyBindings(new ViewModel());
