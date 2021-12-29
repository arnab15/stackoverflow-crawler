const { crawlerRunner } = require("./helpers/crawlerRunner");
const saveQuestionsToCsv = require("./helpers/saveQuestionsToCsv");
require("dotenv").config();
require("./config/dbConfig")();
crawlerRunner()
process.on("SIGINT",saveQuestionsToCsv);
