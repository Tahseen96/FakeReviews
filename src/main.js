import { Actor } from 'apify';
import { launchPuppeteer } from 'crawlee';
import { getRecords } from './helpers.js';

await Actor.init();

const records = await getRecords();

const browser = await launchPuppeteer();

// get url from the email response
const url = 'https://collector.reviews.io/www.schoolrallye.com/product?token=WQVGZDFVSojqcgQAGBRc0psvFU4%2FyGyU78JJ4RZiEttqmJe44KNBOKwLq5CUYquvLcgtj63K27U1%2B28iRRn6YpsJrD32ljuEvWAqBAfvfvqQD3%2Ff7oJmR3P6aqgauSeU';

// Open new tab in the browser
const page = await browser.newPage();

// Navigate to the URL
await page.goto(url);

const ratingButton = await page.$x(`//div[@id='starDiv-1_1_${records.at(0).starRating}']`);
ratingButton[0].click();

const descriptionTextarea = await page.$x("//textarea[@id='product[SR-001][comments]']");
await descriptionTextarea[0].type(records.at(0).descriptionText);

const difficultyButton = await page.$x(`//div[@id='starDiv-1_3_${String(Number(records.at(0).difficultyRating) - 1)}']/input`);
await difficultyButton[0].hover();
await difficultyButton[0].click();

const durationButton = await page.$x(`//div[@id='starDiv-1_4_${String(Number(records.at(0).durationRating) - 1)}']/input`);
await durationButton[0].hover();
await durationButton[0].click();

const submitButton = await page.$x("//a[contains(@class,'submit_name') and not(@data-name='Anonym')]");
// click submit form button
await submitButton;

// Capture the screenshot
const screenshot = await page.screenshot();

// Save the screenshot to the default key-value store
await Actor.setValue('myKey', screenshot, { contentType: 'image/png' });

// Close Puppeteer
await browser.close();

await Actor.exit();
