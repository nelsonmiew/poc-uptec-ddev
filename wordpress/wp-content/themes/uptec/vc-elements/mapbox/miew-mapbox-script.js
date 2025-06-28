function initCentersMap(){
    if ($('#centersMap').length > 0){
        if (!mapboxgl.supported()) {
            console.log('Your browser does not support Mapbox GL');
        }else{
            $('body').addClass('overHidden-mapbox');
            $('#masthead').addClass('stucked');

            var zoom = $('body').innerWidth() > 960 ? 12 : 10;
            var center = $('body').innerWidth() > 960 ? [-8.656973, 41.1621376] : [-8.604742, 41.176834];
            
            var geojson = "";
            $.ajax({
                type: 'post',
                dataType: 'html',
                url: phpVars.ajaxurl,
                data: `action=getCenters&security=${phpVars.centers_nonce}`,
                success: function (response) {
                    //geojson = JSON.parse(response);
                    geojson = JSON.parse(response);

                    mapboxgl.accessToken = 'pk.eyJ1IjoibWlld2RldiIsImEiOiJjanB0dGdpNnkwMG5oM3hxcnBpbXQ5ZnFpIn0.vdBj-XtkNhDfPD2K_8yh1Q';
                    var map = new mapboxgl.Map({
                        container: 'centersMap', // container id
                        style: 'mapbox://styles/miewdev/cjqm8zvrmmwuz2ro7i4w83mzi', //hosted style id
                        center: center,
                        zoom: zoom,
                    });

                    // add markers to map
                    var $i = 1;
                    geojson.features.forEach(function (marker) {
                        // create a DOM element for the marker
                        var el = document.createElement('div');
                        el.className = 'marker listing_title';
                        el.innerHTML = "<span class='text-stroked'>0"+$i+".</span> "+marker.text;

                        el.addEventListener('click', function () {
                            if (!$('#centersPage').hasClass('detail-visible')){
                                //marker.geometry.coordinates[1] -= 0.007;

                                var offset = window.innerWidth <= 960 ? [-150, -100] : [-150, -50];
                                var offsetY = parseInt(($(window).height() / 2) * 0.75);

                                map.flyTo({
                                    center: marker.geometry.coordinates,
                                    offset: [0, -offsetY],
                                    zoom: 14
                                });
                                
                                $('#centersDetail').css('background-image', 'url("' + marker.image + '")');
                                $('#centerDesc').html(marker.message);
                                $('#centerAddress').html(marker.properties.address);
                                $('.marker.active').removeClass('active');
                                $(el).addClass('active clicked');
                            }
                        });
                        document.querySelector('#centersDetail').addEventListener('click', function () {
                            if ($('#centersPage').hasClass('detail-visible')) {                             
                                map.flyTo({
                                    center: center,
                                    zoom: zoom,
                                });
                            }
                        });

                        // add marker to map
                        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
                        $i++;
                    });

                    map.on('moveend', function (e) {
                        if ($('.marker.clicked').length > 0) {
                            map.scrollZoom.disable();
                            map.boxZoom.disable();
                            map.dragPan.disable();
                            map.dragRotate.disable();
                            map.doubleClickZoom.disable();
                            map.touchZoomRotate.disable();

                            var offsetTop = $('.marker.clicked').offset().top + $('.marker.clicked').height();
                            var offsetLeft = window.innerWidth <= 960 ? "50%" : $('.marker.clicked').offset().left + 'px';

                            $('.centersBox').css({
                                'top': offsetTop + 'px',
                                'left': offsetLeft
                            });

                            $('.marker.clicked').removeClass('clicked');
                            $('#centersPage').addClass('detail-visible');
                        } else {
                            map.scrollZoom.enable();
                            map.boxZoom.enable();
                            map.dragPan.enable();
                            map.dragRotate.enable();
                            map.doubleClickZoom.enable();
                            map.touchZoomRotate.enable();

                            $('.marker.active').removeClass('active');

                            $('.centersBox').removeAttr('style');
                            $('#centersPage').removeClass('detail-visible').addClass('moving');

                            $('#centersDetail').css('background-image', 'none');
                            $('#centerDesc').html('');
                            $('#centerAddress').html('');
                        }
                    });

                    map.on('load', function () {
                        $('#centersDetail').appendTo('.mapboxgl-canvas-container');
                    });
                    map.on('resize', function () {
                        if ($('#centersPage').hasClass('detail-visible')) {
                            var el = $('.marker.active');
                            var offsetTop = $(el).offset().top + $(el).height();
                            var offsetLeft = window.innerWidth <= 960 ? "50%" : $(el).offset().left + 'px';

                            $('.centersBox').css({
                                'top': offsetTop + 'px',
                                'left': offsetLeft
                            });
                        }
                    });

                    if ($('.centers-close-area').length>0){
                        $('.centers-close-area').on('click', function (e) {
                            if ($(e.target).closest('.centersBox').length == 0 && $('#centersPage').hasClass('detail-visible')) {
                                $('.marker.clicked').trigger('click');
                            }
                        });
                    }
                }
            });
        }
    }
}