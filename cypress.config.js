const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.kitapsepeti.com",
    chromeWebSecurity: false,
    video: false,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 90000,
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
    },
  },
reporter: "mochawesome",
reporterOptions: {
  reportDir: "cypress/reports",
  overwrite: false,
  html: false,
  json: true
}
});
