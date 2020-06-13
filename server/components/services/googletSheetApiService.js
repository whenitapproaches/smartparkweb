const { google } = require("googleapis")
const keys = require("./credentials.json")
const config = require("config")
const chalk = require("chalk")
const googleSheetId = config.get("googleSheetId")

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
])

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err)
    return
  }
  console.log(
    `${chalk.blue("G")}${chalk.red("o")}${chalk.yellow("o")}${chalk.blue(
      "g"
    )}${chalk.green("l")}${chalk.red("e")} ${chalk.bgBlue("API Connected")}`
  )
})

const gsapi = google.sheets({
  version: "v4",
  auth: client,
})

const startCell = "A1"

const updateGoogleSheets = async (data) => {
  const options = {
    spreadsheetId: googleSheetId,
    range: "Smartpark!A2",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: data,
    },
  }
  gsapi.spreadsheets.values
    .update(options)
    .then(() => console.log(chalk.green("Google Sheets Updated")))
}

module.exports = {updateGoogleSheets}
