const path = require("path");

const buildEslintCommand = (filenames) => {
  const fixables = filenames
    .map((f) => `--file ${path.relative(process.cwd(), f)}`)
    .join(" ");

  return `next lint --fix ${fixables}`;
};

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
