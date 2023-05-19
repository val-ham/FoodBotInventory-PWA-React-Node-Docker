import axios from "axios";
import fs from "fs";

const sendRequests = async (options) => {
  try {
    const response = await axios.request(options);
    console.log(
      `scraped ${response.data.data.store.products.items.length} items, with ${response.data.data.store.products.items[0].name} being the first item`
    ); //check that iterating is working
    return response.data.data.store.products.items;
  } catch (error) {
    console.log(error);
  }
};

const queryOptionsString = (limit, nextQuery) => {
  let variables = `{"includeAvailabilities":false,"availabilityDate":"2023-01-07","facets":[{"key":"brandName","order":"asc"},{"key":"labels"}],"generatedSessionId":"eaa5fcdf-58dd-4f66-9912-c827dee280b7","includeAgeLimitedByAlcohol":true,"limit":${limit},"queryString":"","searchProvider":"loop54","slug":"","storeId":"513971200","useRandomId":false${nextQuery}}`;
  let options = {
    method: "GET",
    url: "https://cfapi.voikukka.fi/graphql",
    params: {
      operationName: "RemoteFilteredProducts",
      variables: variables,
      extensions:
        '{"persistedQuery":{"version":1,"sha256Hash":"f0b2e8b90476688a0cd6042877e0769dd8f7f6be3b34cbcb1f54e23a493b2c13"}}',
    },
    headers: {
      authority: "cfapi.voikukka.fi",
      accept: "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "if-none-match": 'W/"f832-jzrxZxJhsXcKtbz2DUJOmTXnFKI"',
      origin: "https://www.s-kaupat.fi",
      "sec-ch-ua":
        '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      "x-client-name": "skaupat-web",
      "x-client-version": "production-79cbde89ab2b56d5327a59e83e7050762c48e2ee",
    },
  };
  return options;
};

const discardItems = [
  "Muut toimistotarvikkeet",
  "Paperi- ja toimistotarvikkeet",
  "Koti ja vapaa-aika",
  "Ripsivärit",
  "Meikit",
  "Kosmetiikka ja hygienia",
  "Kynsilakat ja muut kynsituotteet",
  "Naisten tuoksut",
  "Deodorantit ja tuoksut",
  "Siivousliinat",
  "Siivousvälineet ja tarvikkeet",
  "Kodinhoito ja taloustarvikkeet",
  "Shampoot",
  "Hiukset ja hiustenhoito",
  "Pesutarvikkeet",
  "Kylpyhuone ja sauna",
  "Sisustus ja kodintekstiilit",
  "Frisbeegolf",
  "Palloilu",
  "Urheilu",
];

const main = async () => {
  let items = [];

  let limit = 2000;
  let nextQueryNum = 0;
  let nextQuery = "";
  let options, queryResult;
  while (true) {
    options = queryOptionsString(limit, nextQuery);
    queryResult = await sendRequests(options);
    console.log(`${nextQueryNum + queryResult.length} items scraped in total`);
    let filteredResult = queryResult
      .filter((e) => {
        let notFound = true;
        if (e.hierarchyPath) {
          for (const item of e.hierarchyPath) {
            if (discardItems.includes(item.name)) {
              notFound = false;
              break;
            }
          }
        }
        return notFound;
      })
      .map((e) => {
        let categories = [];
        if (e.hierarchyPath) categories = e.hierarchyPath.map((h) => h.name);
        return {
          ean: e.ean,
          name: e.name,
          brandName: e.brandName,
          price: e.price,
          comparisonPrice: e.comparisonPrice,
          comparisonUnit: e.comparisonUnit,
          slug: e.slug,
          frozen: e.frozen,
          priceUnit: e.priceUnit,
          categories: categories,
        };
      });
    items.push(...filteredResult);

    //Write in the loop in case error happens, so don't have to scrape already scraped items
    fs.writeFile("data/items.json", JSON.stringify(items), function (err) {
      if (err) {
        console.log(err);
      }
    });

    if (queryResult.length < limit) break; //If less than limit amount, there are no more items to scrape
    nextQueryNum = nextQueryNum + limit;
    nextQuery = `,"from":${nextQueryNum}`;
  }
};
main();
