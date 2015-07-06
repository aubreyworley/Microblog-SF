function SF(post) {
  this.post = post;
}

SF.persist = function(comment) {
  if (!SF.all) {
    SF.all = []
  }

  SF.all.push(comment);

  localStorage.setItem(SF.key, JSON.stringify(SF.all));
};

SF.populate = function() {
  var objects = JSON.parse(localStorage.getItem(SF.key));

  var storageStories = [];

  _.each(objects, function(obj) {
    var post = new SF(obj.post);
    storageStories.push(post);
  });

  SF.all = storageStories;
};

SF.key = "stories";
SF.populate();

SF.prototype.save = function() {
  SF.persist(this);
};

SF.prototype.renderTemplate = function(template_source, where) {
  var template = _.template($(template_source).html());

  _.each(SF.all, function(item) {
    $(where).append(template(item));
  });
};

$(function() {
  var mySF = SF.all && SF.all[0];

  if (!mySF) {
    mySF = new SF("story");
    mySF.save();
  }

  mySF.renderTemplate("#post-template", "#post-container");
});