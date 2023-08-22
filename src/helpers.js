import Airtable from 'airtable';
import dotenv from 'dotenv';
import { MD5 } from 'crypto-js';

dotenv.config();
const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

const domains = [
    '@cevipsa.com',
    '@cpav3.com',
    '@nuclene.com',
    '@steveix.com',
    '@mocvn.com',
    '@tenvil.com',
    '@tgvis.com',
    '@amozix.com',
    '@anypsd.com',
    '@maxric.com',
];

export const getRecords = async () => {
    const finalRecords = [];
    await new Promise((resolve, reject) => {
        base('Review-Database (Live)').select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 1,
            view: 'Grid view',
        }).eachPage((records) => {
            // This function (`page`) will get called for each page of records.
            records.forEach((record) => {
                finalRecords.push(
                    {
                        id: record.get('Order-ID-SR'),
                        starRating: record.get('starrating'),
                        descriptionText: record.get('reviewtext'),
                        difficultyRating: record.get('difficultyrating'),
                        durationRating: record.get('durationrating'),
                    });
            });
            resolve();
        },
        (err) => {
            if (err) {
                reject(err);
            }
        });
    });
    return finalRecords;
};

export const generateRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let email = '';
    for (let i = 0; i < 10; i++) { // Generates a random string of length 10
        email += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${email}@${getRandomDomain()}`;
};

const getRandomDomain = () => {
    const randomIndex = Math.floor(Math.random() * domains.length);
    return domains[randomIndex];
};

export const generateMD5Hash = (input) => {
    return MD5(input).toString();
};
