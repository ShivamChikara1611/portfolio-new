import React, { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AppContext } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const { language } = useContext(AppContext);

    const educationData = {
        en: [
            {
                title: "B.Tech in Computer Science and Engineering",
                school: "Jain Deemed-to-be University",
                date: "2022 - 2026",
                iconBg: "#6b21a8",
                icon: "https://img.icons8.com/color/96/000000/graduation-cap.png",
                points: [
                    "Specialized in Fullstack Development",
                    "Built multiple MERN stack projects",
                    "Learned database design and cloud deployment",
                ],
            },
            {
                title: "Inter School -12th",
                school: "Golden Public School",
                date: "2021 - 2022",
                iconBg: "#2563eb",
                icon: "https://img.icons8.com/color/96/000000/school.png",
                points: ["Focus on Science and Mathematics", "Participated in coding clubs"],
            },
            {
                title: "High School -10th",
                school: "Golden Public School",
                date: "2019 - 2020",
                iconBg: "#16a34a",
                icon: "https://img.icons8.com/color/96/000000/school.png",
                points: ["Focused on STEM subjects", "Developed early programming interest"],
            }
        ],
        jp: [
            {
                title: "コンピュータサイエンス工学学士 (B.Tech)",
                school: "ジャイン大学 (Jain Deemed-to-be University)",
                date: "2022 - 2026",
                iconBg: "#6b21a8",
                icon: "https://img.icons8.com/color/96/000000/graduation-cap.png",
                points: [
                    "フルスタック開発を専門とする",
                    "複数のMERNスタックプロジェクトを構築",
                    "データベース設計とクラウドデプロイメントを学習",
                ],
            },
            {
                title: "インタースクール - 12年生",
                school: "ゴールデンパブリックスクール (Golden Public School)",
                date: "2021 - 2022",
                iconBg: "#2563eb",
                icon: "https://img.icons8.com/color/96/000000/school.png",
                points: [
                    "科学と数学に注力",
                    "コーディングクラブに参加",
                ],
            },
            {
                title: "ハイスクール - 10年生",
                school: "ゴールデンパブリックスクール (Golden Public School)",
                date: "2019 - 2020",
                iconBg: "#16a34a",
                icon: "https://img.icons8.com/color/96/000000/school.png",
                points: [
                    "STEM科目に注力",
                    "プログラミングへの早期関心を育む",
                ],
            }
        ]

    };

    const cardRefs = useRef([]);

    useEffect(() => {
        cardRefs.current.forEach((el) => {
            if (el) {
                const isMedium = window.innerWidth >= 768;
                gsap.from(el, {
                    opacity: 0,
                    x: isMedium
                        ? el.dataset.position === "left"
                            ? -100
                            : 100
                        : 0,
                    y: isMedium ? 50 : 100, // small devices animate from below
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                });
            }
        });
    }, [language]);

    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="education">
            {/* Section Title */}
            <div className="text-center mb-5 md:mb-12">
                <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl">
                    {language === "en" ? "Education" : "学歴"}
                </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-third -translate-x-1/2"></div>
                <div className="md:hidden absolute top-0 bottom-0 left-4 w-1 bg-third"></div>

                {/* Cards */}
                {educationData[language].map((edu, index) => {
                    const isLeft = index % 2 === 0;
                    const isMedium = window.innerWidth >= 768;

                    return (
                        <div
                            key={index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            data-position={isMedium ? (isLeft ? "left" : "right") : "right"}
                            className={`mb-12 w-full flex flex-col md:flex-row items-center justify-between ${isMedium ? (isLeft ? "md:flex-row-reverse" : "md:flex-row") : "md:flex-row"
                                }`}
                        >
                            {/* Card */}
                            <div className="ml-[12vw] md:ml-0 md:w-5/12 px-4">
                                <div className="bg-third/30 p-6 rounded-xl shadow-lg text-white">
                                    <h3 className="text-2xl font-bold">{edu.title}</h3>
                                    <p className="mt-1 text-gray-300">{edu.school}</p>
                                    <p className="mt-1 text-gray-400 text-sm">{edu.date}</p>
                                    <ul className="mt-3 list-disc ml-5 space-y-1 text-gray-200 text-sm">
                                        {edu.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Icon */}
                            <div
                                className={`w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center z-10 ${isMedium ? "-mt-6 md:mt-0" : "mt-0 md:mt-0 absolute -left-1"
                                    }`}
                            >
                                <img src={edu.icon} alt={edu.school} className="w-6 h-6 object-contain" />
                            </div>

                            {/* Empty placeholder for alignment */}
                            <div className="w-5/12 hidden md:block"></div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Education;
