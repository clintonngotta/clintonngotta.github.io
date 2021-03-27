function displayError(thisForm, error) {
  thisForm.find(".loading").removeClass("d-block");
  thisForm.find(".error-message").html(error);
  thisForm.find(".error-message").addClass("d-block");
}
$(document).ready(function () {
  $(".php-email-form").on("submit", function (e) {
    e.preventDefault();
    let formData = $(this).serialize();
    try {
      $.ajax({
        type: "get",
        url: "https://api.clikham.co.ke/mail/mail",
        data: formData,
        headers: { "X-Requested-With": "XMLHttpRequest" },
        beforeSend: function () {
          $(this).find(".my-3 .loading").addClass("d-block");
        },
        success: function (response) {
          if (response == "sent") {
            $(this).find(".my-3 .loading").removeClass("d-block");
            $(this)
              .find("my-3 .sent-message")
              .addClass("d-block")
              .html(
                "Your Message is delivered, I will get back to you as quickly as possible. Thank you"
              );
            document.getElementById("php-email-form").reset();
          } else {
            $(this)
              .find("my-3 .error-message")
              .addClass("d-block")
              .html("Opps! an Error ocurred ! Tray Again.");
            $(this).find(".my-3 .loading").removeClass("d-block");
          }
        },
      });
    } catch (error) {
      console.log(error);
      displayError($(this), error);
    }
  });
});
