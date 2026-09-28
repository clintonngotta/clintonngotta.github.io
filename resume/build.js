// Renders resume.html to the downloadable PDF. Run: node resume/build.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'resume.html'));
  await page.pdf({
    path: path.join(__dirname, '..', 'assets', 'Clinton_Ngotta_Resume.pdf'),
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: false,
  });
  await browser.close();
})();
