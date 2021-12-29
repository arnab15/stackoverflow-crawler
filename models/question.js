const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	url: {
		type: String,
		unique: true,
		trim: true,
		required: true,
	},
	totalReferenceCount: {
		type: Number,
		required: true,
	},
	noOfUpvotes: {
		type: String,
		required: true,
	},
	noOfAnsweres: {
		type: String,
		required: true,
	},
});
questionSchema.index({
	url: 1,
});
exports.Question = mongoose.model("Question", questionSchema);
