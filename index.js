const { Builder, By } = require("selenium-webdriver");
const ObjectsToCsv = require("objects-to-csv");
const { createScrapperUrls } = require("./utils");
const streets = require("./streets");

(async function example() {
  const formattedStreets = createScrapperUrls(streets);
  const totalData = [];

  let driver = await new Builder().forBrowser("chrome").build();

  for (let street of formattedStreets) {
    try {
      console.log(`Revisando ${street.name} ${street.type}: ${street.link}`);

      await driver.get(street.link);

      console.log("Esperando 3 segundos");
      await driver.sleep(3000);

      const totalDesktop = await driver.findElements(
        By.id("totalResultsDesktop")
      );

      if (totalDesktop.length > 0) {
        const total = await totalDesktop[0].getText();

        console.log(`Total para ${street.name} ${street.type}`, total);

        totalData.push({ ...street, total });
      } else {
        console.log(`Total para ${street.name} ${street.type}`, 0);

        totalData.push({ ...street, total: 0 });
      }
    } finally {
    }
  }

  await driver.quit();

  try {
    console.log("Creando Archivo CSV");

    const csv = new ObjectsToCsv(totalData);

    await csv.toDisk("./test.csv");
  } catch (err) {
    console.error("Error creando archivo CSV", err);
  }
})();
