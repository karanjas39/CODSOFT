const fs = require("fs");
const path = require("path");

function loadAndModifyEmailTemplate(title, name, content) {
  const rootDirectory = process.cwd();

  const templatePath = path.join(rootDirectory, "PUBLIC", "emailTemplate.html");

  const templateContent = fs
    .readFileSync(templatePath, "utf8")
    .replace(/\r?\n/g, "");

  const titleRegex = /\${title}/g;
  const nameRegex = /\${name}/g;
  const contentRegex = /\${content}/g;

  const modifiedTemplate = templateContent
    .replace(titleRegex, title)
    .replace(nameRegex, name)
    .replace(contentRegex, content);

  return modifiedTemplate;
}

module.exports = loadAndModifyEmailTemplate;
