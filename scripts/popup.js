const resetForm = document.getElementById("resetForm");

const sliders = [
  "blur",
  "brightness",
  "contrast",
  "grayscale",
  "huerotate",
  "invert",
  "opacity",
  "saturate",
  "sepia"
].reduce((acc, name) => {
  acc[name] = document.getElementById(`${name}slider`);
  return acc;
}, {});

const restorePopup = async () => {
  const result = await chrome.storage.local.get("filters")
  const filters = JSON.parse(result.filters);
  for (const [name, slider] of Object.entries(sliders)) {
    slider.value = filters[name] || 0;
  }
}

const setFilters = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url?.startsWith("chrome://")) return;
      chrome.scripting.executeScript(
        {
            target: { tabId: tabs[0].id },
            files: ["scripts/content.js"],
        },
        () => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    setFilters();
                },
            });
        }
    );
    });
};

const storeFilters = () => {
  const filters = Object.fromEntries(
    Object.entries(sliders).map(([name, slider]) => [name, slider.value])
  );

  chrome.storage.local.set({filters: JSON.stringify(filters)})
}

const resetFilters = () => {
  resetForm.reset();
  storeFilters();
  setFilters();
}

restorePopup()
resetAllButton.addEventListener("click", resetFilters)
document.addEventListener("input", (e) => {
  if (e.target.tagName === "INPUT") {
    storeFilters();
    setFilters();
  }
});
