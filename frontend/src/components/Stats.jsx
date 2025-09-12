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
        if (!count || count === 0) return "#1f2937"; // gray
        if (count < 3) return "#a3e635";             // light green
        if (count < 6) return "#65a30d";             // medium green
        if (count < 10) return "#166534";            // dark green
        return "#4ade80";                            // bright green
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Profile Stats */}
            <div className="grid grid-cols-2 gap-6 text-center mb-8">
                <div className="bg-gray-800 text-white p-4 rounded-2xl shadow">
                    <h2 className="text-xl font-bold">{profile.repos}</h2>
                    <p className="text-sm text-gray-300">Repositories</p>
                </div>
                <div className="bg-gray-800 text-white p-4 rounded-2xl shadow">
                    <h2 className="text-xl font-bold">{contributions.totalContributions}</h2>
                    <p className="text-sm text-gray-300">Contributions</p>
                </div>
            </div>

            {/* Heatmap */}
            <div className="bg-black/20 p-4 rounded-2xl shadow">
                <CalendarHeatmap
                    startDate={new Date(new Date().getFullYear(), 0, 1)}
                    // endDate={new Date(new Date().getFullYear(), 11, 31)}
                    endDate={new Date()}
                    values={contributions.weeks.flatMap((w) => w.contributionDays)}
                    classForValue={() => "heatmap-cell"}
                    tooltipDataAttrs={(val) => ({
                        "data-tooltip-id": "tooltip",
                        "data-tooltip-content": val
                            ? `${val.contributionCount} contribution${val.contributionCount !== 1 ? "s" : ""} on ${val.date}`
                            : `0 contributions`,
                    })}
                    gutterSize={2}
                    transformDayElement={(rect, value) => {
                        const color = value ? getBlockColor(value.contributionCount) : getBlockColor(0);
                        return React.cloneElement(rect, {
                            style: {
                                fill: color,
                                width: 10,
                                height: 10,
                                rx: 2,
                                ry: 2,
                            },
                        });
                    }}
                />
                <ReactTooltip id="tooltip" place="top" variant="dark" />
            </div>
        </div>
    );
};

export default Stats;
