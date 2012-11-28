//Override backbone's sync to use jquery cookies instead

HELPERS = {};

Backbone.sync = function(method, model, options) {
  console.log("sync with:")
  var resp = HELPERS[method].call(this, model);
  resp ? options.success(resp) : options.error("Record not found");
};

HELPERS.read = function(obj) {
  console.log("readin");
  var cookies = HELPERS.parseCookies(document.cookie);
  _.keys(cookies).forEach(function(el, ind, arr) {
    obj.add({ url: cookies[el], cid: el }); //.set('cid', el);
  });
}

HELPERS.create = function(obj) {
  console.log("creating");
  $.cookie("feed-" + obj.cid, obj.get('url'), { expires: 10 });
}

HELPERS.update= function(obj) {
  console.log("updating");
  $.cookie("feed-" + obj.cid, obj.get('url'), { expires: 10 });
}

HELPERS.delete = function(obj) {
  console.log("deleting");
  $.removeCookie("feed-" + obj.cid);
}

//Code from 
//http://stackoverflow.com/questions/5047346/converting-strings-like-document-cookie-to-objects
HELPERS.parseCookies = function(cookieString) {
  var retVal = {};
  cookieString.split(';').forEach(function(el, ind, arr) {
    if (el.trim().substring(0, 5) == "feed-") {
      _.extend(retVal, str_obj(el.substring(5)));
    }
  });
  return retVal;

  function str_obj(str) {
    str = str.split(', ');
    var result = {};
    for (var i = 0; i < str.length; i++) {
      var cur = str[i].split('=');
      result[cur[0]] = cur[1];
    }
    return result;
  }
}
