$(function() {
    $(".center-window").vAlign().hAlign();
    $(".social").click(function() {
        var url;

        switch($(this).attr("data-key")) {
            case "facebook":
                url = "https://www.facebook.com/sharer/sharer.php?";
                url += "u=" + $(this).attr("data-url");
                break;

            case "twitter":
                url = "https://twitter.com/intent/tweet?";
                url += "text=Check out this coupon on @bubblecoup";
                url += "&related=bubblecoup";
                url += "&url=" + $(this).attr("data-url");
                break;

            case "google":
                url = "https://plus.google.com/share?";
                url += "url=" + $(this).attr("data-url");
                break;
        }

        window.open(url, "sharer", [
            "width=500", "height=400", "directories=no", "titlebar=no",
            "toolbar=no", "location=no", "status=no", "menubar=no",
            "scrollbars=no", "resizable=no"
        ].join(","));
    });
});
