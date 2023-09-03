const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const mongoUri = "mongodb+srv://kishanpatel3721:kishanpatel3721@cluster0.pksifpr.mongodb.net/";

        const dbOptions = {
            dbName: "ResortWebsite"
        };
        const connect = await mongoose.connect(mongoUri, dbOptions);
        console.log("Database Connection Successfully");
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = connectDb;