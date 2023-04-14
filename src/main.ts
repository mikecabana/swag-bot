const codes = [
    'TAOWF',
    'AYR7R',
    'AWLQ5',
    'EHXB6',
    'XL5G3',
    'NX2V1',
    'YCRYJ',
    '9V464',
    'FASTN',
    'LOUDN',
    'HTTPS',
    'STUMP',
    'ES202',
    'SPECT',
    'ACULA',
    'SHADO',
    'JSONP',
    'T64JO',
    'FNWOV',
    'Q5CRU',
    'TMTF2',
    'YTKE6',
    '2T6WG',
    'QTW9R',
    'HOTBO',
    '5L87D',
    '73TI4',
    'PONHM',
    'SIIII',
    'PIIII',
    'IRFGH',
    'Q6DPD',
    '193G5',
    'PTSNO',
    'ULQ7D',
    'KYMNS',
    'SFF18',
];

const email = 'mikeycabana@gmail.com';

const usedMsg = `Shoot, eh! Either that isn't a valid code, or someone got to this code before you did! Please try another code.`;
const goofMsg = `You are some sort of goofball trying this!`;
const errorMsg = `Nice try brother`;

const rand = (min = 500, max = 1000) => Math.floor(Math.random() * (max - min + 1) + min);

import puppeteer from 'puppeteer';

const bot = async (index = 0): Promise<any> => {
    if (!codes[index]) {
        console.log('done - no more codes');
        return;
    }

    console.log(`${index} - starting bot with code: ${codes[index]}`);

    const browser = await puppeteer.launch({ headless: false, args: [`--window-size=${600},${800}`] });
    const page = await browser.newPage();

    await page.setViewport({ width: 600, height: 800 });

    await page.goto('https://swag.syntax.fm/');

    // Type into search box
    await page.type('input#email', email, { delay: 100 });
    await page.type('input#code', codes[index], { delay: 100 });

    await page.click('button[type="submit"]', { delay: rand() });

    const warningElSelector = await page.waitForSelector(`div.warning`);
    if (warningElSelector === null) {
        console.log(`done - code ${codes[index]} worked`);
        await browser.close();
        return;
    } else {
        const warningElText = await warningElSelector.evaluate((w) => w.innerText);
        if (warningElText === usedMsg) {
            console.log('code already used');
        } else if (warningElText === errorMsg) {
            console.log('code already used');
        } else if (warningElText === goofMsg) {
            console.log('you done goofed');
        } else {
            console.log('something else happened');
        }
        await browser.close();
        return bot(index + 1);
    }
};

bot();
