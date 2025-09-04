$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();

  $('.header-overlay').css({
    opacity: function() {
      var elementHeight = $(this).height()/1.7;
      return 0.85 - ((elementHeight - scrollTop) / elementHeight)*0.85;
    }
  });
});