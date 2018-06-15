const PLACES_SEARCH_URL = "https://maps.googleapis.com/maps/api/geocode/json";

function getDataFromApi(searchTerm, callback) {
  const query = {
    key: "AIzaSyClAGAlVzkT-vNFM8rXYuEe3Iu-SHFS9eE",
    address: `${searchTerm}`,
  }

  $.getJSON(PLACES_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  return `
    <div>
      <h2>
        ${result.geometry.location.lat}, ${result.geometry.location.lng}
      </h2>
    </div>
  `;
}

function displayBookstoreData(data) {
  const results = data.results.map((item, index) => renderResult(item));
  $(`.places-search-results`).html(results);
}

function watchSubmit() {
  $(`.places-search`).submit(event => {
    event.preventDefault();
    const query1 = $(".address-query").val();
    const query2 = $(".city-query").val();
    const queryCombined = `${query1} ${query2}`
    getDataFromApi(queryCombined, displayBookstoreData);

  });
}


///////////////////////////////////////////////////////////////////////

var map;
var infowindow;

function initMap() {
  var pyrmont = {lat: -33.867, lng: 151.195};
  map = new google.maps.Map(document.getElementById('map'), {
    center: pyrmont,
    zoom: 15
  });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['store']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }