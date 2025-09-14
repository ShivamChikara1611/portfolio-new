import React, { useEffect, useState, useContext } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { AppContext } from "../context/AppContext";

const Stats = () => {
    const { language } = useContext(AppContext);

    const [profile, setProfile] = useState(null);
    const [contributions, setContributions] = useState(null);
    const [topRepos, setTopRepos] = useState([]);
    const [activity, setActivity] = useState(null);

    // Translations
    const translations = {
        en: {
            loading: "Loading GitHub Stats...",
            repos: "Repositories",
            contributions: "Contributions",
            topRepos: "Top Repositories",
            recentActivity: "Recent Activity",
            commits: "commits",
            noActivity: "No recent activity",
            on: "on",
        },
        jp: {
            loading: "GitHub統計を読み込み中...",
            repos: "リポジトリ",
            contributions: "貢献数",
            topRepos: "トップリポジトリ",
            recentActivity: "最近の活動",
            commits: "コミット",
            noActivity: "最近の活動はありません",
            on: "に",
        },
    };

    const t = translations[language] || translations.en;
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        fetch(`${backendUrl}/api/profile`)
            .then((res) => res.json())
            .then(setProfile);

        fetch(`${backendUrl}/api/contributions`)
            .then((res) => res.json())
            .then(setContributions);

        fetch(`${backendUrl}/api/top-repos`)
            .then((res) => res.json())
            .then(setTopRepos);

        fetch(`${backendUrl}/api/recent-activity`)
            .then((res) => res.json())
            .then(setActivity);
    }, []);

    if (!profile || !contributions) return <p className="text-xl italic font-thin text-center my-16 text-gray-400 tracking-wider">{t.loading}</p>;

    // Map contribution count to block color
    const getBlockColor = (count) => {
        if (!count || count === 0) return "#303330"; // gray
        if (count < 3) return "#1D5B1A";             // light green
        if (count < 6) return "#329E2C";             // medium green
        if (count < 10) return "#3FC738";            // dark green
        return "#62D15C";                            // bright green
    };

    return (
        <div className="my-30 max-w-[1000px] mx-auto px-5 md:px-0">

            <h2 className="text-white text-center mb-10 font-black text-4xl sm:text-5xl md:text-6xl">
                {language === "en" ? "GitHub Stats" : "GitHub 活動統計"}
            </h2>

            <div className="md:grid md:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_5fr] gap-5">
                {/* Profile Stats */}
                <div className="flex md:flex-col gap-3 md:gap-0 justify-between mb-3 md:mb-0">
                    <div className="bg-amber-400/70 text-white p-4 w-full rounded-lg text-center shadow cursor-pointer hover:bg-amber-400/90">
                        <h2 className="text-xl font-bold tracking-widest">{profile.repos}</h2>
                        <p className="text-sm text-gray-300">{t.repos}</p>
                    </div>
                    <div className="bg-cyan-500/80 text-white w-full p-4 rounded-lg text-center shadow cursor-pointer hover:bg-cyan-500">
                        <h2 className="text-xl font-bold tracking-widest">{contributions.totalContributions}</h2>
                        <p className="text-sm text-gray-300">{t.contributions}</p>
                    </div>
                </div>

                {/* Heatmap container */}
                <div className="bg-black/20 p-4 rounded-lg shadow overflow-x-auto scroll-container">
                    <div className="min-w-[900px] h-full flex justify-end">
                        <CalendarHeatmap
                            startDate={new Date(new Date().getFullYear(), 0, 1)}
                            endDate={new Date(new Date().getFullYear(), 11, 31)}
                            values={contributions.weeks.flatMap((w) => w.contributionDays)}
                            classForValue={() => "heatmap-cell"}
                            tooltipDataAttrs={(val) => ({
                                "data-tooltip-id": "tooltip",
                                "data-tooltip-content": val
                                    ? `${val.contributionCount} ${t.commits} ${t.on} ${val.date}`
                                    : `0 ${t.commits}`,
                            })}
                            gutterSize={4}
                            transformDayElement={(rect, value) => {
                                const color = value ? getBlockColor(value.contributionCount) : getBlockColor(0);
                                return React.cloneElement(rect, {
                                    style: {
                                        fill: color,
                                        width: 12,
                                        height: 12,
                                        rx: 2,
                                        ry: 2,
                                    },
                                });
                            }}
                            horizontal={true}
                            showMonthLabels={true}
                        />
                        <ReactTooltip id="tooltip" place="top" variant="dark" />
                    </div>
                </div>
            </div>

            <div className="mt-10 space-y-3 md:space-y-0 md:grid md:grid-cols-2 gap-5">
                {/* Top 3 Repos */}
                <div className="bg-black/20 p-4 rounded-lg shadow text-white max-h-[20vh] md:max-h-[30vh] overflow-y-scroll scroll-container">
                    <h3 className="text-lg mb-3 text-center tracking-wider font-thin">{t.topRepos}</h3>
                    <ul className="space-y-3">
                        {topRepos.map((repo, i) => (
                            <li key={i} className="border-b border-third pb-2">
                                <a
                                    href={repo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary font-semibold"
                                >
                                    {repo.name}
                                </a>
                                <br />
                                <span className="text-xs text-gray-300">
                                    {repo.commits} {t.commits}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Recent Activity */}
                <div className="bg-black/20 p-4 rounded-lg shadow text-white max-h-[20vh] md:max-h-[30vh] overflow-y-scroll scroll-container">
                    <h3 className="text-lg mb-3 text-center tracking-wider font-thin">{t.recentActivity}</h3>
                    {activity ? (
                        <ul className="space-y-2 text-sm">
                            {activity.commitContributionsByRepository.map((repo, i) =>
                                repo.contributions.nodes.map((c, j) => (
                                    <li key={`${i}-${j}`}>
                                        <span className="text-gray-300">
                                            {c.commitCount} {t.commits} {t.on}{" "}
                                        </span>
                                        <a
                                            href={repo.repository.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary"
                                        >
                                            {repo.repository.name}
                                        </a>{" "}
                                        <span className="text-gray-400">
                                            {t.on} {c.occurredAt}
                                        </span>
                                    </li>
                                ))
                            )}
                        </ul>
                    ) : (
                        <p className="text-gray-300">{t.noActivity}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stats;
