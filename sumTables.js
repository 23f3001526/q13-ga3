const { chromium } = require('playwright');

// List of your seeds (or links)
const seeds = [4,5,6,7,8,9,10,11,12,13];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; // <- replace with actual link
    await page.goto(url, { waitUntil: 'networkidle' });

    // Get all numbers from table cells
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText.replace(/,/g, ''))).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a + b, 0);
    console.log(`Seed ${seed} sum: ${sum}`);
    grandTotal += sum;
  }

  console.log('FINAL TOTAL:', grandTotal);
  await browser.close();
})();
