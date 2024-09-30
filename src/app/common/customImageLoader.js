// customImageLoader.js
const customImageLoader = ({ src, width, quality }) => {
	return `${src}?w=${width}&q=${quality || 100}`;
};

module.exports = customImageLoader;
