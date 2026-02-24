const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const svgContent = fs.readFileSync('/Users/manish/Desktop/delego-landing/public/media/logo_for_dark_bg.svg', 'utf8');

    await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background: transparent;">
        ${svgContent}
      </body>
    </html>
  `);

    await page.screenshot({
        path: '/Users/manish/Desktop/delego-landing/public/media/true_logo.png',
        omitBackground: true,
        clip: { x: 0, y: 0, width: 450, height: 100 }
    });

    await browser.close();
    console.log("Successfully rendered transparent logo.");
})();
