
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Carolina Huddle Hall of Fame player data
const players = [
    {
        id: 1,
        name: "Steve Smith Sr.",
        number: 89,
        position: "Wide Receiver",
        years: "2001 - 2013",
        description: "A legendary Panthers receiver known for his toughness, speed, and memorable performances.",
        img_name: "images/stevesmith.png"
    },
    {
        id: 2,
        name: "Cam Newton",
        number: 1,
        position: "Quarterback",
        years: "2011 - 2019",
        description: "A dynamic quarterback who became one of the most recognizable players in Panthers history.",
        img_name: "images/camnewton.png"
    },
    {
        id: 3,
        name: "Luke Kuechly",
        number: 59,
        position: "Linebacker",
        years: "2012 - 2019",
        description: "A dominant linebacker known for his intelligence, tackling ability, and leadership on defense.",
        img_name: "images/lukekuechly.png"
    },
    {
        id: 4,
        name: "Julius Peppers",
        number: 90,
        position: "Defensive End",
        years: "2002 - 2009",
        description: "An elite defensive end who became one of the most accomplished defensive players in franchise history.",
        img_name: "images/juliuspeppers.png"
    },
    {
        id: 5,
        name: "Thomas Davis Sr.",
        number: 58,
        position: "Linebacker",
        years: "2005 - 2018",
        description: "A respected Panthers linebacker remembered for his leadership, toughness, and dedication to the team.",
        img_name: "images/thomasdavissr.png"
    },
    {
        id: 6,
        name: "DeAngelo Williams",
        number: 34,
        position: "Running Back",
        years: "2006 - 2014",
        description: "A productive running back who provided Carolina with speed and big-play ability out of the backfield.",
        img_name: "images/deangelowilliams.png"
    },
    {
        id: 7,
        name: "Jordan Gross",
        number: 69,
        position: "Offensive Tackle",
        years: "2003 - 2013",
        description: "A dependable offensive tackle who protected Panthers quarterbacks for more than a decade.",
        img_name: "images/jordangross.png"
    },
    {
        id: 8,
        name: "Greg Olsen",
        number: 88,
        position: "Tight End",
        years: "2011 - 2019",
        description: "A reliable tight end who became one of Carolina's most important receiving targets.",
        img_name: "images/gregolsen.png"
    }
];

// API homepage
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Get all players
app.get("/api/players", (req, res) => {
    res.json(players);
});

// Get one player by ID
app.get("/api/players/:id", (req, res) => {
    const player = players.find(
        (item) => item.id === Number(req.params.id)
    );

    if (!player) {
        return res.status(404).json({ message: "Player not found" });
    }

    res.json(player);
});

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB Atlas");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Could not connect to MongoDB:", err);
    });

