// Overlay Controls
var body = $('body');

function closeModal(className, scroll) {
  $(className).removeClass('modal-flex-class').addClass('hidden');
  if(!scroll){
	  if(body.hasClass('no-scroll')){
	    body.removeClass('no-scroll');
	  }
  }
}

function openModal(className, scroll) {
  $(className).removeClass('hidden').addClass('modal-flex-class');
  if(scroll != null){
    body.addClass('no-scroll');
  }
}