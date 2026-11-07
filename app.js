
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Carolina Huddle player data
const players = [
    {
        id: 1,
        name: "Bryce Young",
        number: 9,
        position: "Quarterback",
        description: "The Panthers' starting quarterback."
    },
    {
        id: 2,
        name: "Chuba Hubbard",
        number: 30,
        position: "Running Back",
        description: "A powerful running back for Carolina."
    },
    {
        id: 3,
        name: "Tetairoa McMillan",
        number: 4,
        position: "Wide Receiver",
        description: "A talented young receiving threat."
    },
    {
        id: 4,
        name: "Jaycee Horn",
        number: 8,
        position: "Cornerback",
        description: "A key part of Carolina's defense."
    },
    {
        id: 5,
        name: "Derrick Brown",
        number: 95,
        position: "Defensive Tackle",
        description: "A leader on the defensive line."
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
