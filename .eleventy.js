const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = async function(eleventyConfig) {
  // Passthrough for the originals and styles
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

  // Pre-generate responsive images for known sources (so we can expose a sync shortcode to Liquid)
  const imageMetadata = {};

  async function generateFor(src) {
    let srcPath = src.startsWith('/') ? path.join('.', src) : src;
    let metadata = await Image(srcPath, {
      widths: [480, 960, 1600],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/images",
      urlPath: "/images"
    });
    imageMetadata[src] = metadata;
  }

  // Generate for the apple-watch image which we just added. You can expand this list later.
  try {
    await generateFor('/images/apple-watch.jpg');
    await generateFor('/images/wallet.jpg');
    await generateFor('/images/iphone.jpg');
  } catch (e) {
    // If generation fails at config time, log it and continue; templates will still use original images.
    console.warn('eleventy-img generation warning:', e.message);
  }

  // Sync shortcode that reads pre-generated metadata and returns picture markup (works in Liquid/Nunjucks)
  function imageShortcodeSync(src, alt = "", sizes = "100vw", className = "") {
    if (!alt) {
      throw new Error(`Missing \"alt\" attribute for image ${src}`);
    }
    const metadata = imageMetadata[src];
    if (!metadata) {
      // Fallback: return a simple img tag pointing at the original src
      return `<img src=\"${src}\" alt=\"${alt}\" loading=\"lazy\">`;
    }

    const toSrcset = (items) => items.map(i => `${i.url} ${i.width}w`).join(', ');
    const webp = metadata['webp'];
    const jpeg = metadata['jpeg'];
    const fallbackSrc = jpeg[jpeg.length - 1].url;

    const cls = className ? ` class=\"${className}\"` : "";
    return `<picture>
      <source type=\"image/webp\" srcset=\"${toSrcset(webp)}\" sizes=\"${sizes}\">\n
      <source type=\"image/jpeg\" srcset=\"${toSrcset(jpeg)}\" sizes=\"${sizes}\">\n
      <img src=\"${fallbackSrc}\" alt=\"${alt}\"${cls} loading=\"lazy\" decoding=\"async\">\n
    </picture>`;
  }

  eleventyConfig.addNunjucksShortcode("image", imageShortcodeSync);
  eleventyConfig.addLiquidShortcode("image", imageShortcodeSync);

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};