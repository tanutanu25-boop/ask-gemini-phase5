import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Ask Gemini server is running");
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.post("/ask", async (req, res) => {

    try {

        const question = req.body.question;

        if (!question) {
            return res.status(400).json({
                answer: "Please enter a question."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question
        });

        res.json({
            answer: response.text
        });

    } catch (error) {

        console.log("Gemini Error:", error);

        res.status(500).json({
            answer: "Something went wrong. Please try again."
        });

    }

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

