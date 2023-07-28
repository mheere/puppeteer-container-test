const express = require('express');
const puppeteer = require('puppeteer');

const app = express();

app.get('/ping', async (req, res) => {
    console.log('pong');
});

app.get('/screenshot', async (req, res) => {
  console.log('Taking screenshot');
  
  // executablePath: 'google-chrome-stable',
  // executablePath: '/usr/bin/google-chrome',
  //headless: 'new',
  // executablePath: '/usr/bin/google-chrome',

  try {

    // console.log(`--> executablePath: '/opt/google/chrome/google-chrome'`);
    console.log(`--> executablePath: 'google-chrome-stable'`);
    // console.log(`--> executablePath: 'no path !!! :)`);

    // const browser = await puppeteer.launch({
    //   headless: 'new',
    //   executablePath: '/opt/google/chrome/google-chrome',
    //   dumpio: true,
    //   args: [
    //       "--no-sandbox",
    //       "--disable-gpu",
    //   ]
    // });

    // const browser = await puppeteer.launch({
    //   headless: 'new',
    //   executablePath: '/opt/google/chrome/google-chrome',
    //   args: [
    //       "--no-sandbox",
    //       "--disable-gpu",
    //   ]
    // });

    // const browser = await puppeteer.launch({
    //   headless: 'new',
    //   args: ["--no-sandbox"],
    // });

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: 'google-chrome-stable',
        args: [
          "--no-sandbox",
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
  }
  catch(err) {
    console.error(err);
  }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});