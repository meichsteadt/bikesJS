(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Bike() {
}

Bike.prototype.getBikes = function(zipcode, listingFunction, errorFunction) {
  $.get('https://bikeindex.org/api/v3/search?page=1&per_page=15&location=' + zipcode + '&distance=10&stolenness=proximity').then(function(response) {
    listingFunction(response.bikes);
    console.log(response);
  }).fail(function(error) {
    errorFunction(error.responseJSON.message)
  });
};

exports.bikeModule = Bike;

},{}],2:[function(require,module,exports){
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

},{"./../js/bikes.js":1}]},{},[2]);
