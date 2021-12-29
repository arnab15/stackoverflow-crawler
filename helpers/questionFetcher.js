const axios = require("axios");
const cheerio = require("cheerio");

exports.fetchQuestionsByPageNumber = async (pageNumber, setTaskInTasksQueue) => {
	try {
		const response = await axios.get(`https://stackoverflow.com/questions?&page=${pageNumber}`);
		const $ = cheerio.load(response.data);
		const links = $("h3>a.question-hyperlink")
			.map((i, link) => `https://stackoverflow.com${link.attribs.href}`)
			.get();
        console.log("links",links)
		setTaskInTasksQueue(links);
	} catch (error) {
		setTaskInTasksQueue([]);
		console.log("Error occured in fetchQuestionsByPageNumber ", error);
	}
};
