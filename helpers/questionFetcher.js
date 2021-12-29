const axios = require("axios");
const cheerio = require("cheerio");
const { Question } = require("../models/question");
const crawlerConsts = require("../constants/crawlerConsts");
const fetchQuestionsByPageNumber = async (pageNumber, setTaskInTasksQueue) => {
	try {
		const response = await axios.get(`${process.env.HOST_QUESTION_ENDPOINT}?&page=${pageNumber}`);
		const $ = cheerio.load(response.data);
		const links = $(crawlerConsts.FETCH_QUESTION_FROM_QUESTION_PAGE_SELECTOR)
			.map((i, link) => `${process.env.HOST_URL}${link.attribs.href}`)
			.get();
		setTaskInTasksQueue(links);
	} catch (error) {
		setTaskInTasksQueue([]);
		console.log("Error occured in fetchQuestionsByPageNumber ", error);
	}
};

exports.retriveQuestionData = async (questionUrl, currentPage, setTaskInTasksQueue) => {
	const urlData = {
		url: questionUrl,
	};

	const { data } = await axios.get(questionUrl);
	const $ = cheerio.load(data);

	const noans = $(crawlerConsts.NO_ANS_SELECTOR);
	const upvote = $(crawlerConsts.UPVOTE_COUNT_SELECTOR).text().trim().split(" ")[0].trim();

	if (noans.length > 0) {
		urlData.noOfAnsweres = 0;
		urlData.noOfUpvotes = upvote;
	} else {
		const noOfAnswares = $(crawlerConsts.NUMBER_OF_ANS_SELECTOR).text().trim();
		urlData.noOfAnsweres = noOfAnswares;
		urlData.noOfUpvotes = upvote;
	}
	const relatedQuestions = $(crawlerConsts.RELETED_QUESTION_SELECTOR)
		.map((i, link) => `${process.env.HOST_URL}${link.attribs.href}`)
		.get();
	if (relatedQuestions.length > 0) {
		setTaskInTasksQueue(relatedQuestions);
	} else {
		await fetchQuestionsByPageNumber(currentPage + 1, setTaskInTasksQueue);
		currentPage += 1;
	}

	const newQuestion = new Question({
		...urlData,
		totalReferenceCount: 1,
	});
	await newQuestion.save();
};

exports.fetchQuestionsByPageNumber = fetchQuestionsByPageNumber;
