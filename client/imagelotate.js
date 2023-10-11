$(document).ready(function(){
    $('.fish').on('animationend', function () {
        if ($(this).attr('data-order') === 'left') {
            $(this).attr('data-order', 'right');
        } else {
            $(this).attr('data-order', 'left');
        }
    });
  });

