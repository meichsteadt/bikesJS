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
