$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();

  $('.header-overlay').css({
    opacity: function() {
      var elementHeight = $(this).height()/1.75;
      return 0.9 - ((elementHeight - scrollTop) / elementHeight)*0.9;
    }
  });
});