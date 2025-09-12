import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";

const Stats = () => {
    const [profile, setProfile] = useState(null);
    const [contributions, setContributions] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/profile")
            .then((res) => res.json())
            .then(setProfile);

        fetch("http://localhost:5000/api/contributions")
            .then((res) => res.json())
            .then(setContributions);
    }, []);

    if (!profile || !contributions) return <p>Loading GitHub Stats...</p>;

    // Map contribution count to block color
    const getBlockColor = (count) => {
        if (!count || count === 0) return "#303330"; // gray
        if (count < 3) return "#1D5B1A";             // light green
        if (count < 6) return "#329E2C";             // medium green
        if (count < 10) return "#3FC738";            // dark green
        return "#62D15C";                            // bright green
    };

    return (
        <div className="my-16 md:grid md:grid-cols-[1fr_4fr] gap-5 min-h-[180px] max-w-[1000px] mx-auto px-5 md:px-0">
            {/* Profile Stats */}
            <div className="flex md:flex-col gap-3 md:gap-0 justify-between mb-3 md:mb-0">
                <div className="bg-white/5 text-white p-4 w-full rounded-2xl text-center shadow">
                    <h2 className="text-xl font-bold">{profile.repos}</h2>
                    <p className="text-sm text-gray-300">Repositories</p>
                </div>
                <div className="bg-white/5 text-white w-full p-4 rounded-2xl text-center shadow">
                    <h2 className="text-xl font-bold">{contributions.totalContributions}</h2>
                    <p className="text-sm text-gray-300">Contributions</p>
                </div>
            </div>

            {/* Heatmap */}
            <div className="bg-black/20 p-4 rounded-2xl shadow overflow-x-auto">
                <div className="min-w-[1000px] h-full flex justify-end">
                    <CalendarHeatmap
                        startDate={new Date(new Date().getFullYear(), 0, 1)}
                        endDate={new Date(new Date().getFullYear(), 11, 31)}
                        values={contributions.weeks.flatMap((w) => w.contributionDays)}
                        classForValue={() => "heatmap-cell"}
                        tooltipDataAttrs={(val) => ({
                            "data-tooltip-id": "tooltip",
                            "data-tooltip-content": val
                                ? `${val.contributionCount} contribution${val.contributionCount !== 1 ? "s" : ""} on ${val.date}`
                                : `0 contributions`,
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
                </div>
                <ReactTooltip id="tooltip" place="top" variant="dark" />
            </div>
        </div>
    );
};

export default Stats;
