const puppeteer = require('puppeteer');

const scrapePost = require('./scrapePost');

// const tableSelector = 'body > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table:nth-child(2)';
// const firstMonthSelector = tableSelector + '.catbg'

async function run() {
  const browser = await puppeteer.launch({
    // headless: false,
  });

  const page = await browser.newPage();

  await page.goto('http://www.turns-all-year.com/skiing_snowboarding/trip_reports/index.php', {
    waitUntil: 'domcontentloaded',
  });
  // await page.screenshot({ path: 'screenshots/github.png' });

  const monthUrls = await page.$$eval('td.windowbg2 a', as => as.filter(a => a.innerText.includes('Backcountry Trip Reports')).map(a => a.href));

  // console.log(monthUrls);

  await page.goto(monthUrls[1], {
    waitUntil: 'domcontentloaded',
  });

  const postAnchorSelector = 'body > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table.bordercolor > tbody > tr:not(.titlebg) td:nth-child(2) a';

  const postUrls = await page.$$eval(postAnchorSelector, as => as.map(a => a.href));

  // console.log(postUrls);

  await page.goto(postUrls[1], {
    waitUntil: 'domcontentloaded',
  });

  const firstPost = await scrapePost(page);

  console.log(JSON.stringify(firstPost, null, 2));
  console.log('success');

  /* await page.waitForNavigation({
    waitUntil: 'networkidle5',
  });

  await page.click('body > table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table.bordercolor');

  await page.waitForNavigation({
    waitUntil: 'domcontentloaded',
  });*/

  setTimeout(() => browser.close(), 3000);
}

run();
