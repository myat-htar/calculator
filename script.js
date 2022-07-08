let theme = localStorage.getItem("theme") || 1;
document.body.setAttribute("theme", theme);
let themeCircles = document.querySelectorAll(".theme-circle");
themeCircles.forEach((themeCircle) => {
  if (themeCircle.value == theme) {
    themeCircle.setAttribute("checked", true);
  }
  themeCircle.addEventListener("change", (e) => {
    localStorage.setItem("theme", e.target.value);
    document.body.setAttribute("theme", e.target.value);
  });
});
