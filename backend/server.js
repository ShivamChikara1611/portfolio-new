import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_API = "https://api.github.com";
const GITHUB_GRAPHQL = "https://api.github.com/graphql";
const TOKEN = process.env.GITHUB_TOKEN;

// Profile (repos, followers, etc.)
app.get("/api/profile", async (req, res) => {
    try {
        const { data } = await axios.get(`${GITHUB_API}/users/ShivamChikara1611`, {
            headers: { Authorization: `Bearer ${TOKEN}` },
        });
        res.json({
            repos: data.public_repos,
            followers: data.followers,
            following: data.following,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Contributions (heatmap + total)
app.get("/api/contributions", async (req, res) => {
    try {
        const query = `
      {
        user(login: "ShivamChikara1611") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;
        const { data } = await axios.post(
            GITHUB_GRAPHQL,
            { query },
            { headers: { Authorization: `Bearer ${TOKEN}` } }
        );

        res.json(data.data.user.contributionsCollection.contributionCalendar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
