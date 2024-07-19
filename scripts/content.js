(() => {
  const html = document.documentElement;

  const setFilters = async () => {
    const result = await chrome.storage.local.get("filters")
    const filters = JSON.parse(result.filters);
    
    const { sepia, saturate, opacity, invert, huerotate, grayscale, contrast, brightness, blur } = filters;

    const filter = `
      sepia(${sepia / 100})
      saturate(${saturate / 100 })
      opacity(${opacity / 100})
      invert(${invert / 100})
      hue-rotate(${huerotate}deg)
      grayscale(${grayscale / 100})
      contrast(${contrast / 100})
      brightness(${brightness / 100})
      blur(${blur}px)
    `

    html.style.setProperty("filter", filter, "important");
    chrome.storage.local.set(filters);
  }

  setFilters()
})()