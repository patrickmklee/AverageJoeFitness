const express = require("express");
const routes = require("./routes");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Define API routes here
app.get("/api/test", (request, response) => {
    response.json({ "test": "value" });
})

// Add routes, both API and view
app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost/portionCrushDB"
);

console.log(`!MONGO, online and listening`);

app.listen(PORT, () => {
    console.log(`🌍  ==> API server now on port ${PORT}!`);
});