var Bike = require('./../js/bikes.js').bikeModule;

$(function() {
  function listBikes(bikeArray) {
    var list = "";
    bikeArray.forEach(function(bike) {
      var date = new Date(bike.date_stolen * 1000)
      var thumb = bike.thumb
      if(bike.thumb == null) {
        thumb = 'http://www.goautodirect.ca/static/img/no_image_available.jpg'
      }
      list += ('<div class="col-md-4">' +
                '<div class="panel">' +
                  '<div class="panel-heading">' +
                    '<h3 class="panel-title">' + bike.manufacturer_name + '</h3>' +
                    '<p>' + date.toLocaleString() + '</p>' +
                  '</div>' +
                  '<div class = "panel-body">' +
                    '<img class="img-responsive" src="' + thumb + '">' +
                    '<p><strong>Model: </strong>' + bike.frame_model + '</p>' +
                    '<p><strong>Color: </strong>' + bike.frame_colors[0] + '</p>' +
                    '<p><strong>Location: </strong>' + bike.stolen_location + '</p>' +
                  '</div>' +
                '</div>' +
              '</div>'
              );
    });
    $('#recentStolen').html(list);
  }

  function errorFunction(error) {
    $('#recentStolen').html('<li>' + error + '</li>');
  }

  $('form').submit(function(event) {
    event.preventDefault();
    zipcode = $('#zipcode').val();
    var bike = new Bike();
    function reload() {
      bike.getBikes(zipcode, listBikes, errorFunction)
    }
    reload();
    setInterval(reload, 60000);
  });
});
