import * as mongoose from 'mongoose';
export const movieDbSchema = new mongoose.Schema({
	_id: { type: mongoose.Types.ObjectId, cast: String },
	id: { type: Number, required: true },
	name: { type: String, required: true },
	status: { type: String, required: false },
	type: { type: String, required: false },
	rating: { average: { type: Number, required: true } },
	genres: { type: [String], required: true },
});
