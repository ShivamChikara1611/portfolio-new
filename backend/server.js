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
const USERNAME = "ShivamChikara1611";
const TOKEN = process.env.GITHUB_TOKEN;

// Profile (repos, followers, etc.)
app.get("/api/profile", async (req, res) => {
  try {
    const { data } = await axios.get(`${GITHUB_API}/users/${USERNAME}`, {
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
        user(login: "${USERNAME}") {
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

// Top 3 busiest repositories
app.get("/api/top-repos", async (req, res) => {
  try {
    const query = `
      {
        user(login: "${USERNAME}") {
          repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
            nodes {
              name
              url
              description
              createdAt
              updatedAt
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 100) {
                      totalCount
                    }
                  }
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

    // Sort by commit history size
    let repos = data.data.user.repositories.nodes.map((repo) => ({
      name: repo.name,
      url: repo.url,
      description: repo.description,
      commits: repo.defaultBranchRef?.target?.history?.totalCount || 0,
      updatedAt: repo.updatedAt,
    }));

    repos.sort((a, b) => b.commits - a.commits);
    res.json(repos.slice(0, 5));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recent activity (issues, PRs, commits)
app.get("/api/recent-activity", async (req, res) => {
  try {
    const query = `
      {
        user(login: "${USERNAME}") {
          contributionsCollection {
            commitContributionsByRepository(maxRepositories: 5) {
              repository {
                name
                url
              }
              contributions(first: 5) {
                nodes {
                  occurredAt
                  commitCount
                }
              }
            }
            pullRequestContributions(first: 5) {
              nodes {
                occurredAt
                pullRequest {
                  title
                  url
                }
              }
            }
            issueContributions(first: 5) {
              nodes {
                occurredAt
                issue {
                  title
                  url
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

    res.json(data.data.user.contributionsCollection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);