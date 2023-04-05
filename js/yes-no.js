'use strict';

$('document').ready(function () {
  $('#question').keypress(function (event) {
    if (event.which === 13) {
      const question = $('#question').val();
      const lastChar = question.substr(-1);
      if (lastChar === '?') {
        issueAjaxCall();
      } else {
        alert(`valid question ends with '?'`);
      }
    }
  });
});

function issueAjaxCall() {
  $.ajax({
    url: 'https://yesno.wtf/api',
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      $('#answer').text(response.answer);
      $('#image').attr('src', response.image);

      if (response.answer === 'yes') {
        $.ajax({
          url: 'https://api.chucknorris.io/jokes/random',
          method: 'GET',
          dataType: 'json',
          success: function (response) {
            $('#joke').text(response.value);
          },
        });
      }

      if (response.answer === 'no') {
        
        $('#joke').remove();
        $.ajax({
          url: 'https://dog.ceo/api/breeds/image/random',
          method: 'GET',
          dataType: 'json',
          success: function (response) {
            $('#image').attr('src', response.message);
          },
        });
      }
    },
    error: function (xhr, status, error) {
      // Code to execute if the request fails
      console.log('Failed Loading Document');
    },
  });
}
