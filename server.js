const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/screenshot', async (req, res) => {
    console.log('Taking screenshot');
    console.log(`executablePath: 'google-chrome-stable',`);

    // executablePath: 'google-chrome-stable',
    // executablePath: '/usr/bin/google-chrome',
    //headless: 'new',

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/usr/bin/google-chrome',
      dumpio: true,
      args: [
          "--no-sandbox",
          "--disable-gpu",
      ]
    });

    console.log('NewPage');
    const page = await browser.newPage();

    console.log('Goto google');
    await page.goto('https://www.google.com');

    console.log('page.screenshot');
    const imageBuffer = await page.screenshot();
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(imageBuffer);
    console.log('Screenshot taken');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});