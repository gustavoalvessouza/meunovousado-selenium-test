const path = require("path");
const { Builder, By, Key } = require("selenium-webdriver");

const { SITE_URL } = require("./config");
const { USERNAME, PASSWORD } = require("./auth");

require("chromedriver");

const announce = {
  brand: "Honda",
  model: "HONDA CIVIC 2.0 16V FLEXONE EXL 4P CVT",
  year: "2021",
  mileage: "8000",
  investiment: "136000",
  price: "136000",
  description: "Barbada, carro de levar os filhos na escola...",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFilePath(fileName) {
  return path.resolve(__dirname, fileName);
}

(async function startBot() {
  console.log("[meunovousado] Iniciando testes...");

  let driver = await new Builder().forBrowser("chrome").build();

  await driver.manage().window().setRect({ width: 2000, height: 1500 });

  await driver.get(SITE_URL);

  await driver.findElement(By.xpath("//*[text() = 'Minha loja']")).click();

  await sleep(2000);

  await driver
    .findElement(By.css("input[placeholder='E-mail']"))
    .sendKeys(USERNAME);

  await driver
    .findElement(By.css("input[placeholder='Sua senha']"))
    .sendKeys(PASSWORD);

  await sleep(2000);

  await driver.findElement(By.xpath("//*[text() = 'Entrar']")).click();

  await sleep(3000);

  await driver
    .findElement(By.xpath("//*[text() = 'Criar um anúncio']"))
    .click();

  await sleep(2000);

  await driver
    .findElement(By.css("input[placeholder='Marca']"))
    .sendKeys(announce.brand);

  await sleep(1000);

  await driver
    .findElement(By.css("input[placeholder='Modelo']"))
    .sendKeys(announce.model);

  await driver
    .findElement(By.css("input[placeholder='Ex: 2023']"))
    .sendKeys(announce.year);

  await sleep(2000);

  await driver.executeScript("window.scrollTo(0, 0)");

  await driver
    .findElement(By.css("input[placeholder='Quilometragem']"))
    .sendKeys(announce.mileage);

  await driver
    .findElement(By.css("input[placeholder='Quilometragem']"))
    .sendKeys(announce.mileage);

  await driver
    .findElement(By.css("input[placeholder='R$ 80,000']"))
    .sendKeys(announce.investiment);

  await driver
    .findElement(By.css("input[placeholder='R$ 50,000']"))
    .sendKeys(announce.price);

  await driver
    .findElement(By.css("input[placeholder='Descrição adicional']"))
    .sendKeys(announce.description);

  await sleep(3000);

  await driver.findElement(By.xpath("//*[text() = 'Próximo']")).click();

  console.log("[meunovousado] Enviando imagens do anúncio...");
  await sleep(2000);

  await driver
    .findElement(By.id("dropzone-file"))
    .sendKeys(getFilePath("anuncio1.jpg"));
  await sleep(2000);
  await driver
    .findElement(By.id("dropzone-file"))
    .sendKeys(getFilePath("anuncio2.jpg"));
  await sleep(2000);
  await driver
    .findElement(By.id("dropzone-file"))
    .sendKeys(getFilePath("anuncio3.jpg"));

  console.log("[meunovousado] Criando anúncio...");

  await sleep(2000);

  await driver.executeScript("window.scrollTo(0, 0)");

  await sleep(1500);

  await driver.findElement(By.xpath("//*[text() = 'Voltar']")).click();

  await sleep(2000);

  await driver.executeScript("window.scrollTo(0, 0)");

  await sleep(1500);

  await driver.findElement(By.xpath("//*[text() = 'Próximo']")).click();

  await sleep(1500);

  const submitButton = await driver.findElement(
    By.css('button[type="submit"]')
  );
  if (
    (await submitButton.getText()) === "Criar Anúncio" &&
    (await submitButton.isDisplayed()) &&
    (await submitButton.isEnabled())
  ) {
    await submitButton.sendKeys(Key.RETURN);
  }

  await sleep(7000);

  await driver.findElement(By.xpath("//*[text() = 'Dashboard']")).click();
})();
