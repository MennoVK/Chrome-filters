html = document.documentElement;

chrome.storage.local.get("filters", function (result) {
  filters = JSON.parse(result["filters"]);
  html.style.setProperty(
    "filter",
    "sepia(" +
      filters.sepia / 100 +
      ")" +
      "saturate(" +
      filters.saturate / 100 +
      ")" +
      "opacity(" +
      filters.opacity / 100 +
      ")" +
      "invert(" +
      filters.invert / 100 +
      ")" +
      "hue-rotate(" +
      filters.huerotate +
      "deg)" +
      "grayscale(" +
      filters.grayscale / 100 +
      ")" +
      "contrast(" +
      filters.contrast / 100 +
      ")" +
      "brightness(" +
      filters.brightness / 100 +
      ")" +
      "blur(" +
      filters.blur +
      "px)",
    "important"
  );
  localStorage.setItem("filters", filters);
});
