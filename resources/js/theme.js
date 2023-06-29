const Preference = (value) => {
  var userPreference = JSON.parse(localStorage.getItem("preference")) || {};
  const currValue = userPreference[value];
  const newValue = currValue === true ? false : true;
  userPreference = { ...userPreference, [value]: newValue };
  localStorage.setItem("preference", JSON.stringify(userPreference));
  render();
};

const render = () => {
  const preference = JSON.parse(localStorage.getItem("preference"));
  if (preference && preference.darkTheme == true) {
    $("body").addClass("dark");
    $(".fa-sun-bright").addClass("fa-moon");
    $(".fa-sun-bright").removeClass("fa-sun-bright");
  } else {
    $("body").removeClass("dark");
    $(".fa-moon").addClass("fa-sun-bright");
    $(".fa-moon").removeClass("fa-moon");
  }
  if (preference && preference.stickyScroll == true) {
    $("html").css("scroll-snap-type", "y mandatory");
    $(".fa-file-dashed-line").addClass("fa-file");
    $(".fa-file-dashed-line").removeClass("fa-file-dashed-line");
  } else {
    $("html").css("scroll-snap-type", "none");
    $(".fa-file").addClass("fa-file-dashed-line");
    $(".fa-file").removeClass("fa-file");
  }
};
