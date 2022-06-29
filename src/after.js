// @ts-check

const https = require('https');

/**
 * @typedef Character
 * @property {string} slug
 * @property {number} polarity
 */

/**
 * @typedef House
 * @property {string} slug
 * @property {Character[]} members
 */

const GAME_API_PREFIX = `https://api.gameofthronesquotes.xyz/v1`;

/**
 *
 * @param {string} url
 * @return {Promise<*>}
 */
async function getHttpJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let jsonStr = '';
      res.setEncoding('utf-8');
      res.on('data', (data) => {
        jsonStr += data;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(jsonStr));
        } catch {
          reject(new Error('Invalid Json Response'));
        }
      });
    });
  });
}

/**
 * @returns {Promise<House[]>}
 */
async function getHouses() {
  return getHttpJSON(`${GAME_API_PREFIX}/houses`); // await 없음
}

/**
 *
 * @param {string} quotes
 * @return {string}
 */
function quotesSanitizer(quotes) {
  return quotes.replace(/[^a-zA-Z0-9,. ]+/g, '');
}

/**
 *
 * @param {string} slug
 * @returns {Promise<string>}
 */
async function getQuotesOfCharacter(slug) {
  const character = await getHttpJSON(`${GAME_API_PREFIX}/character/${slug}`);
  const mergedQuotes = quotesSanitizer(character[0].quotes.join(' '));

  return mergedQuotes;
}

/**
 * @param {string} quote
 * @return {Promise<*>}
 */
async function getSentimAPIResult(quote) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      text: quote,
    });
    console.log('<body>', body);
    const postReq = https.request(
      {
        hostname: 'sentim-api.herokuapp.com',
        method: 'POST',
        path: '/api/v1/',
        headers: {
          Accept: 'application/json; encoding=utf-8',
          'Content-Type': 'application/json; encoding=utf-8',
          'Content-Length': body.length,
        },
      },
      (res) => {
        let jsonStr = '';
        res.setEncoding('utf-8');
        res.on('data', (data) => {
          jsonStr += data;
        });
        res.on('end', () => {
          try {
            console.log(jsonStr);
            resolve(JSON.parse(jsonStr));
          } catch {
            reject(new Error('Invalid Json Response'));
          }
        });
      }
    );

    postReq.write(body);
  });
}

/**
 *
 * @param {number[]} numbers
 * @return {number}
 */
function sum(numbers) {
  return numbers.reduce((result, current) => result + current, 0);
}

async function main() {
  const houses = await getHouses();

  const characters = await Promise.all(
    houses
      .map((house) =>
        house.members.map((member) =>
          //   house: house.slug,
          //   member: member.slug,
          //   quote: getQuotesOfCharacter(member.slug),
          getQuotesOfCharacter(member.slug).then((quote) => ({
            house: house.slug,
            character: member.slug,
            quote,
          }))
        )
      )
      .flat()
  );
  //   houses.forEach((house) => {
  //     house.members.forEach((member) => {
  //       getQuotesOfCharacter(member.slug).then((quotes) =>
  //         console.log(house.slug, member.slug, quotes)
  //       );
  //     });
  //   });

  const charatersWithPolarity = await Promise.all(
    characters.map(async (character) => {
      const apiResult = await getSentimAPIResult(character.quote);
      return {
        ...character,
        polarity: apiResult.result.polarity,
      };
    })
  );
  //   /** @type {Object.<string, Character[]>} */
  const charactersByHouseSlug = {};
  charatersWithPolarity.forEach((character) => {
    charactersByHouseSlug[character.house] =
      charactersByHouseSlug[character.house] || [];
    charactersByHouseSlug[character.house].push(character);
  });

  const houseSlugs = Object.keys(charactersByHouseSlug);
  const result = houseSlugs
    .map((houseSlug) => {
      const characters = charactersByHouseSlug[houseSlug];
      if (!characters) {
        return undefined;
      }
      const sumOfPolrarity = sum(
        characters.map((charater) => charater.polarity)
      );
      const avgOfPolrarity = sumOfPolrarity / characters.length;
      return [houseSlug, avgOfPolrarity];
    })
    .sort((a, b) => a[1] - b[1]);

  console.log(result);
}

main();
