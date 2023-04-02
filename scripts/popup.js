blurslider = document.getElementById("blurslider");
brightnessslider = document.getElementById("brightnessslider");
contrastslider = document.getElementById("contrastslider");
grayscaleslider = document.getElementById("grayscaleslider");
huerotateslider = document.getElementById("huerotateslider");
invertslider = document.getElementById("invertslider");
opacityslider = document.getElementById("opacityslider");
saturateslider = document.getElementById("saturateslider");
sepiaslider = document.getElementById("sepiaslider");

resetForm = document.getElementById("resetForm");

chrome.storage.local.get("filters", function (result) {
  filters = JSON.parse(result["filters"]);
  blurslider.value = filters.blur;
  brightnessslider.value = filters.brightness;
  contrastslider.value = filters.contrast;
  grayscaleslider.value = filters.grayscale;
  huerotateslider.value = filters.huerotate;
  invertslider.value = filters.invert;
  opacityslider.value = filters.opacity;
  saturateslider.value = filters.saturate;
  sepiaslider.value = filters.sepia;
});

var filters = {};
updatePercentage = () => {
  filters.blur = blurslider.value;
  filters.brightness = brightnessslider.value;
  filters.contrast = contrastslider.value;
  filters.grayscale = grayscaleslider.value;
  filters.huerotate = huerotateslider.value;
  filters.invert = invertslider.value;
  filters.opacity = opacityslider.value;
  filters.saturate = saturateslider.value;
  filters.sepia = sepiaslider.value;
  chrome.storage.local.set({ filters: JSON.stringify(filters) }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["scripts/content.js"],
      });
    });
  });
};

document.addEventListener("change", function (e) {
  if (e.target.tagName == "INPUT") {
    updatePercentage();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.className == "resetbutton") {
    e.target.nextElementSibling.value =
      e.target.nextElementSibling.defaultValue;
    updatePercentage();
  } else if (e.target.className == "resetallbutton") {
    console.log("reset");
    resetForm.reset();
  }
});
