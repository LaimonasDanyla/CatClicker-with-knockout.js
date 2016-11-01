var ViewModel = function() {
    this.clickCount = ko.observable(0);
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('www.flickr.com');

    this.incrementCounter = function() {
      this.clickCount(this.clickCount() + 1);
    };

  /*  this.catLevelName = ko.observableArray([
      {catLevel: "Small"},
      {catLevel: "Medium"},
      {catLevel: "Big"}
    ]);
*/
    //this.catLevel = ko.observable();
    this.catLevel = ko.computed(function() {
      if (this.clickCount() <= 10) {
        return "small";
      } else if (this.clickCount() >= 11 && this.clickCount() <= 20) {
        return "medium";
      } else {
        return "Big";
      }
    }, this);

}

ko.applyBindings(new ViewModel());
