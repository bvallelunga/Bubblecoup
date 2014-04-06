$(function() {
   $(".confirm").hAlign().vAlign();
   $('.input-expiration').payment('formatCardExpiry');
   $('.input-cvc').payment('formatCardCVC');
   $('.input-card')
        .payment('formatCardNumber')
        .keyup(function() {
            var type = $.payment.cardType($(this).val());

            if(type && type != "Unknown") {
                $(".new-card .logo")
                    .attr("src", "/img/cards/" + type.toLowerCase().replace(" ", "") + ".png")
                    .load(function() {
                        $(".new-card .logo").fadeIn(200);
                    });
            } else {
                $(".new-card .logo").fadeOut(200);
            }
        });

   $(".confirm form").submit(function(e) {
        e.preventDefault();
        e.stopPropagation();

        var form = $(this);

        $.post($(this).attr("action"), $(this).serialize(), function(response) {
            if(response.success) {
                window.location.href = response.next;
            } else {
                form.find(".button").addClass("error").val(response.error_message);
            }
        });
    });
});
