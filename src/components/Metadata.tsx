/**
 * React 19 Metadata Component
 * Provides document metadata for SEO, Open Graph, and social sharing
 */
export function Metadata() {
  return (
    <>
      <title>Linus Johansson | Full-Stack Developer Portfolio</title>

      {/* Primary Meta Tags */}
      <meta name="title" content="Linus Johansson - Full-Stack Developer" />
      <meta
        name="description"
        content="Junior Full-Stack Developer portfolio showcasing React, TypeScript, Node.js, and modern web development projects. Available for hire."
      />
      <meta
        name="keywords"
        content="React, TypeScript, Full-Stack Developer, Web Development, Portfolio, JavaScript, Node.js"
      />
      <meta name="author" content="Linus Johansson" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Linus Johansson - Full-Stack Developer Portfolio"
      />
      <meta
        property="og:description"
        content="Junior Full-Stack Developer specializing in React, TypeScript, and Node.js"
      />
      <meta property="og:image" content="/assets/image_me.webp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Linus Johansson - Full-Stack Developer"
      />
      <meta
        name="twitter:description"
        content="Junior Full-Stack Developer portfolio with React and TypeScript projects"
      />
      <meta name="twitter:image" content="/assets/image_me.webp" />
    </>
  );
}
