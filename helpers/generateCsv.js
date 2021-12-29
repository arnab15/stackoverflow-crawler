const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
	path: "questions.csv",
	header: [
		{ id: "url", title: "url" },
		{ id: "totalReferenceCount", title: "totalReferenceCount" },
		{ id: "noOfUpvotes", title: "noOfUpvotes" },
		{ id: "noOfAnsweres", title: "noOfAnsweres" },
	],
});

exports.generateCsv = async (records) => {
	try {
		await csvWriter.writeRecords(records);
		console.log("CSV Generated...");
	} catch (error) {
		console.log("Unable to generate csv..", error);
	}
};
