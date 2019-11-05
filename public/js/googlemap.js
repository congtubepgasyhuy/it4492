var lat=$('#maplat').val();
var long = $('#maplong').val();
function initMap() {

    if((lat!="")&&(long!="")){

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: parseFloat(lat), lng: parseFloat(long)},
            zoom: 13
        });
    }
    else{
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -33.8688, lng: 151.2195},
            zoom: 13
        });
    }
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow;
    if((lat!="")&&(long!="")){
        geocodeLatLng(geocoder, map, infowindow);
    }

    var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

    var autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        geocodeAddress(geocoder, map);
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }


    });

}

//         Ham xac dinh lat va long
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('pac-input').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            document.getElementById('maplat').value = results[0].geometry.location.lat();
            document.getElementById('maplong').value = results[0].geometry.location.lng() ;
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

//       Prevent Enter key
$('#form-input').on('keypress', function(e) {
    return e.which !== 13;
});


// Xac dinh mark cho map
function geocodeLatLng(geocoder, map, infowindow) {
    var latlng = {lat: parseFloat(lat), lng: parseFloat(long)};
    geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {
                map.setZoom(11);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map
                });
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(map, marker);
                $('#pac-input').val(results[0].formatted_address);
            } else {
                window.alert('Không tìm thấy kết quả.');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}