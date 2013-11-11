var Socialighter = (function () {
  var me = {};

  me.sharing = function() {
    return $(".share_button").bind("click", function(e) {
      var el = $(this);
      var data = el.parent(".share_buttons").data();
      var socialType = el.data("button-type");
      var href = window.location.href;
      var shareWindow = window.open("", "Share_Window", "menubar=0,resizable=1,width=550,height=350,toolbar=0,scrollbars=1,location=0");
      e.preventDefault();
      return $.ajax("/shorten", {
        dataType: "json",
        type: "POST",
        data: {
          long_url: href
        },
        timeout: 200,
        success: function (e) {
          // el.fadeTo(50, 1);
          // var n = e.status_code !== 200 ? s : e.data.url;
          window.Socialighter.send_to_social(data, socialType, shareWindow);
        },
        error: function () {
          // el.fadeTo(50, 1);
          window.Socialighter.send_to_social(data, socialType, shareWindow)
        }
      });
    });
  };

  me.send_to_social = function(data, type, shareWindow) {
    var shareUrl = "";
    switch (type) {
      case "twitter":
        shareUrl = "https://twitter.com/intent/tweet?original_referer=" + data.source + "&text=" + data.title + "&url=" + data.uri + "&via=BW";
        break;
      case "facebook":
        shareUrl = "https://www.facebook.com/sharer.php?u=" + data.uri + "&t=" + data.title;
        break;
      case "linked_in":
        shareUrl = "http://www.linkedin.com/shareArticle?mini=true&url=" + data.uri + "&title=" + data.title + "&summary=" + data.summary + "&source=" + data.source;
        break;
      case "gplus":
        shareUrl = "https://plusone.google.com/_/+1/confirm?hl=en&url=" + data.uri;
        break;
    }
    shareWindow.location = shareUrl;
    
  };

  return me;
}());
