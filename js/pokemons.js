'use strict';

$(document).ready(function () {
  var apiURL = 'https://pokeapi.co/api/v2/pokemon/';
  var pokemons = [];

  $.ajax({
    url: apiURL,
    method: 'GET',

    success: function (response) {
      pokemons = response.results;
      console.log('pokemons: ', pokemons);
      pokemons.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      $.each(pokemons, function (index, value) {
        $.ajax({
          url: value.url,
          method: 'GET',
          success: function (response) {
            // Create a div for each pokemon and add its name, front sprite image, and weight
            var $pokemonCard = $('<div>').addClass('pokemon-card');
            var $name = $('<h2>').text(response.name);
            var $image = $('<img>').attr('src', response.sprites.front_default);
            var $weight = $('<p>').text('Weight: ' + response.weight);

            // Add the elements to the pokemon card
            $pokemonCard.append($name, $image, $weight);

            // Add the pokemon card to the pokemon list container
            $('#pokemon-list').append($pokemonCard);
          },
          error: function (xhr, status, error) {
            console.log('An error occurred: ' + error);
          },
        });
      });
    },
    error: function (xhr, status, error) {
      console.log('An error occurred: ' + error);
    },
  });
});
