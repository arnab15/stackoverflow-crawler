const { Question } = require("../models/question");
const { generateCsv } = require("./generateCsv");

async function saveQuestionsToCsv(){
    try {
		const questions = await Question.find().select("-_id -__v");
		await generateCsv(questions);
	} catch (error) {
		console.log("err", error);
		process.exit(1);
	}
	console.log("SIGINT fired");
	setTimeout(() => {
		process.exit(1);
	}, 1000);
}

module.exports=saveQuestionsToCsv