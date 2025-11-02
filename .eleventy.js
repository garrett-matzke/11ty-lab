module.exports = function(eleventyConfig) {
  // Passthrough for images and styles
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");

  // Simple shortcode to render an item card used on the homepage
  eleventyConfig.addShortcode("itemCard", function(title, url, img, excerpt) {
    return `
      <article class="item-card">
        <a class="item-link" href="${url}">
          <div class="item-media">
            <img src="${img}" alt="${title}" loading="lazy">
          </div>
          <div class="item-body">
            <h2 class="item-title">${title}</h2>
            <p class="item-excerpt">${excerpt}</p>
          </div>
        </a>
      </article>
    `;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

// The export statement makes these settings available to other files in 11ty
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles");
};