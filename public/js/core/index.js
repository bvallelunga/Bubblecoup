$(function() {
    $(".notfound div").vAlign();

    $(".google-search").each(function() {
        new google.maps.places.Autocomplete($(this).get(0));
    });
});
