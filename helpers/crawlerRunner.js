const { Question } = require("../models/question");
const { fetchQuestionsByPageNumber, retriveQuestionData } = require("./questionFetcher");
const tasks = [];
let currentPage = 1;

const setTaskInTasksQueue = (tasksData) => {
	tasks.push(...tasksData);
};

const crawlTask = async () => {
	let url = tasks.shift();
	console.log("current crawl url", url);

	const questionAlreadyExist = await Question.findOne({ url: url.trim() });

	if (!questionAlreadyExist) {
		await retriveQuestionData(url, currentPage, setTaskInTasksQueue);
	} else {
		questionAlreadyExist.totalReferenceCount += questionAlreadyExist.totalReferenceCount;
		await questionAlreadyExist.save();
		await fetchQuestionsByPageNumber(currentPage + 1, setTaskInTasksQueue);
		currentPage += 1;
	}
};
exports.crawlerRunner = async () => {
	await fetchQuestionsByPageNumber(currentPage, setTaskInTasksQueue);
	while (tasks.length > 0) {
		try {
			if (tasks.length > 0) {
				await crawlTask();
				await crawlTask();
				await crawlTask();
				await crawlTask();
				await crawlTask();
			} else {
				await fetchQuestionsByPageNumber(currentPage + 1, setTaskInTasksQueue);
				currentPage += 1;
			}
		} catch (error) {
			console.log("someting went wrong", error);
			process.exit(1);
		}
	}
};
