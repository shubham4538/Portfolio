// Check form Submitted time
var $submittedHourAgo = false;
$(document).ready(() => {
  const $submittedDateStr = localStorage.getItem("timeSubmitted");
  const $submittedDate = new Date($submittedDateStr);
  const $currentDate = new Date();
  const $timeDiffNum = $submittedDate - $currentDate;
  const $timeDiff = Math.floor(Math.abs($timeDiffNum) / 1000 / 60 / 60);

  if ($timeDiff <= 0) {
    $("#form-submit").prop("disabled", true);
    $("#form-submit").css("opacity", "0.5");
    $("#form-submit").css("cursor", "not-allowed");
    $submittedHourAgo = true;
  }
});

// Add loader
const addLoader = () => {
  $("#button-parent").addClass("wait");
  $("#form-submit").addClass("loading");
  $("#form-submit").css("pointer-events", "none");
  $("#form-submit").append(
    "<i id='loader' class='fa-duotone fa-spinner-third fa-spin'></i>"
  );
};

// Remove loader
const removeLoader = () => {
  $("#form").trigger("reset");
  $("#button-parent").removeClass("wait");
  $("#form-submit").removeClass("loading");
  $("#form-submit").css("pointer-events", "all");
  $("#loader").remove();
};

// Submit form
$("form").submit((e) => {
  e.preventDefault();
  addLoader();
  let validated = true;

  // Validation
  const $data = $("form")[0];
  const $name = $data[0];
  const $email = $data[1];
  const $phone = $data[2];
  const $message = $data[3].value;

  const regName = new RegExp("^[A-Za-z\\s]+$");
  if (!regName.test($name.value)) {
    validated = false;
    $name.nextElementSibling.innerText = "Enter Valid name";
  } else {
    $name.nextElementSibling.innerText = "";
  }

  const regPhone = new RegExp(`^(?:\\+91)?\\d{10}$`);
  if (!regPhone.test($phone.value)) {
    validated = false;
    $phone.nextElementSibling.innerText =
      "Invalid Number (try using Numbers only)";
  } else {
    $phone.nextElementSibling.innerText = "";
  }

  const regEmail = new RegExp(
    `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
  );
  if (!regEmail.test($email.value)) {
    validated = false;
    $email.nextElementSibling.innerText = "Invalid Email Address";
  } else {
    $email.nextElementSibling.innerText = "";
  }

  if ($submittedHourAgo) {
    alert(`Form Already Submitted!`);
    removeLoader();
    return false;
  }

  if (validated) {
    // Create data
    var $dataset = {
      name: $name.value,
      email: $email.value,
      phone: $phone.value,
      message: $message,
    };

    // Send data
    $.ajax({
      url: "https://portfolio-server-flax.vercel.app/formdata",
      // dataType: "jsonp",
      data: JSON.stringify($dataset),
      type: "POST",
      success: function (data) {
        console.log(data);
        data = JSON.parse(data);
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.response);
          var $submitDate = new Date();
          localStorage.setItem("timeSubmitted", $submitDate.toString());
        }
      },
      error: function (xhr, status, error) {
        alert("Error: " + error.message);
        removeLoader();
      },
    }).then(() => {
      removeLoader();
      // Disable Button
      $("#form-submit").prop("disabled", true);
      $("#form-submit").css("opacity", "0.5");
      $("#form-submit").css("cursor", "not-allowed");
      $submittedHourAgo = true;
    });
  }
  // $("input").map((item, data) => {
  //   console.log($(data)[0].value);
  // });
});
