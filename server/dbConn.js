import mongoose, { mongo } from "mongoose";
import { configDotenv } from "dotenv";
configDotenv()
const {MONGO_URI} = process.env;

const connectToDatabase = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Database connected');
	} catch (err) {
		console.error('Error in db connection', err);
		throw err;
	}
};

export default connectToDatabase;