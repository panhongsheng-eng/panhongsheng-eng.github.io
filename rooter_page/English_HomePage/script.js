$(document).ready(function(){
	$('#nav-icon').click(function(){
		$(this).toggleClass('open');
    $(".overlay").toggleClass("open");
    $(".overlay a").toggleClass("open");
  $(".overlay p").toggleClass("open");
	});
  
  // Scroll Reveal
  // ScrollReveal().reveal('.services .grid .card');
  
  $('.square.blue').on('inview', function(event, isInView) {
    if (isInView) {
      // element is now visible in the viewport
      $(this).addClass("in-view");
    } else {
      // element has gone out of viewport
      $(this).removeClass("in-view");
    }
  });
});