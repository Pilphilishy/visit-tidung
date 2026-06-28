import markdownit from 'markdown-it';
const parser = new markdownit();

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateMonth = (date: Date) => {
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
  });
};

export const generateExcerpt = (content: string, length = 100) => {
  // Remove frontmatter
  let cleaned = content.replace(/^---[\s\S]*?---\s*/m, '');

  // Remove ES module imports
  cleaned = cleaned.replace(/^import\s.+;?\s*$/gm, '');

  // Render markdown
  const renderedContent = parser.render(cleaned);

  // Remove HTML tags
  const plainText = renderedContent.replace(/(<([^>]+)>)/gi, '');

  return plainText.length > length
    ? plainText.slice(0, length) + '...'
    : plainText;
};
