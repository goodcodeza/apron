const path = require("path");

const buildPrettierCommand = (filenames) => {
  const fixables = filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ");

  return `prettier --ignore-unknown --write ${fixables}`;
};

const buildEslintCommand = (filenames) => {
  const fixables = filenames
    .map((f) => `--file ${path.relative(process.cwd(), f)}`)
    .join(" ");

  return `next lint --fix ${fixables}`;
};

module.exports = {
  "*": [buildPrettierCommand],
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
