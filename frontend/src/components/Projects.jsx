import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import gsap from "gsap";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import GitHubIcon from '@mui/icons-material/GitHub';
import assets from '../assets/assets';

const projectsData = {
    en: [
        {
            name: "E-Vending Machine",
            image: `${assets.eVendingMachine}`,
            description:
                "E-Vending Machine is a platform for cashless, fast, and secure transactions. Features include QR-based product selection, real-time payments via Stripe, and separate customer/admin panels for order management and inventory control. The system enables contactless vending, instant order processing, and streamlined digital transactions.",
            tags: ["MERN", "TailwindCSS", "Stripe"],
            viewLink: "https://vendingmachinefrontend.onrender.com/",
            githubLink: "https://github.com/ShivamChikara1611/vending-machine",
        },
        {
            name: "MAX Hospital",
            image: `${assets.maxHospital}`,
            description:
                "Built a MERN-based Hospital Management System with CNN-powered skin cancer detection (94% accuracy) hosted on Azure. Features include JWT-secured logins, online appointments, digital payments, and remote consultations. Deployed on Vercel, Render, and Azure, reducing wait times by 60% and enabling AI-assisted healthcare from home.",
            tags: ["MERN", "ML", "Gemini API", "CNN", "Stripe"],
            viewLink: "https://www.max-hospital.shivamchikara.xyz/",
            githubLink: "https://github.com/ShivamChikara1611/hospital-3js",
        },
        {
            name: "Nagasaki City Food",
            image: `${assets.nagasaki}`,
            description:
                "Nagasaki City Food showcasing restaurants and food options around Nagasaki Stadium City. Features include restaurant browsing, menu display, online ordering, and real-time order tracking. The platform provides a seamless digital dining experience, integrating secure user authentication, and efficient management for orders and restaurant data.",
            tags: ["MERN", "Springboot", "Stripe", "TailwindCSS", "Hibernate", "JPA"],
            viewLink: "",
            githubLink: "https://github.com/ShivamChikara1611/nagasaki-city-food",
        },
        {
            name: "FactoryEyeDX",
            image: `${assets.factory}`,
            description:
                "Developed FactoryEyeDX, enabling Digital Transformation (DX). Features include Admin and Employee panels for task management, employee tracking, live sensor monitoring, and automatic alerts via interactive MUI dashboards. It streamlines factory operations and is scalable for real-time sensor integration and large-scale deployments.",
            tags: ["MERN", "MUI", "Dashboard", "TailwindCSS"],
            viewLink: "",
            githubLink: "https://github.com/ShivamChikara1611/FactoryEyeDX",
        },
        {
            name: "Sneakinn",
            image: `${assets.sneakin}`,
            description:
                "E-commerce platform for shoes with dual panels for customers and sellers. Features include secure user authentication, product browsing, cart management, and messaging for customers, while sellers can manage products, and profiles. It offers real-time dynamic content, role-based access control, and a smooth shopping and management experience.",
            tags: ["PHP", "PhpMyAdmin", "Dashboard", "CSS"],
            viewLink: "",
            githubLink: "https://github.com/ShivamChikara1611/sneakinn-php",
        },
    ],
    jp: [
        {
            name: "E-Vending Machine",
            image: `${assets.eVendingMachine}`,
            description:
                "E-Vending Machineは、キャッシュレスで迅速かつ安全な取引を実現するプラットフォームです。QRコードによる商品選択、Stripeによるリアルタイム決済、顧客/管理者用のパネルで注文管理と在庫管理を提供します。非接触型の自動販売、即時注文処理、効率的なデジタルトランザクションを可能にします。",
            tags: ["MERN", "TailwindCSS", "Stripe"],
            viewLink: "https://vendingmachinefrontend.onrender.com/",
            githubLink: "https://github.com/ShivamChikara1611/vending-machine",
        },
        {
            name: "MAX Hospital",
            image: `${assets.maxHospital}`,
            description:
                "MERNベースの病院管理システムを構築し、CNNによる皮膚がん検出（94％の精度）をAzureにホストしました。JWTによる安全なログイン、オンライン予約、デジタル決済、リモート診療を実装。Vercel、Render、Azureにデプロイし、待機時間を60％削減し、自宅でAI支援医療を可能にしました。",
            tags: ["MERN", "ML", "Gemini API", "CNN", "Stripe"],
            viewLink: "https://www.max-hospital.shivamchikara.xyz/",
            githubLink: "https://github.com/ShivamChikara1611/hospital-3js",
        },
        {
            name: "Nagasaki City Food",
            image: `${assets.nagasaki}`,
            description:
                "長崎スタジアムシティ周辺のレストランや飲食店を紹介するプラットフォームです。レストランの閲覧、メニュー表示、オンライン注文、リアルタイムの注文追跡を提供。安全なユーザー認証と効率的な注文・店舗データ管理を統合し、シームレスなデジタル食体験を実現します。",
            tags: ["MERN", "Springboot", "Stripe", "TailwindCSS", "Hibernate", "JPA"],
            viewLink: "",
            githubLink: "https://github.com/ShivamChikara1611/nagasaki-city-food",
        },
        {
            name: "FactoryEyeDX",
            image: `${assets.factory}`,
            description:
                "FactoryEyeDXを開発し、デジタルトランスフォーメーション（DX）を実現。管理者と従業員用のパネルでタスク管理、従業員追跡、センサー監視、インタラクティブなMUIダッシュボードによる自動アラートを提供。工場運営を効率化し、リアルタイムセンサー統合や大規模展開に対応可能です。",
            tags: ["MERN", "MUI", "Dashboard", "TailwindCSS"],
            viewLink: "",
            githubLink: "https://github.com/ShivamChikara1611/FactoryEyeDX",
        },
        {
            name: "Sneakinn",
            image: `${assets.sneakin}`,
            description:
                "靴のEコマースプラットフォームで、顧客と販売者用の二重パネルを提供。安全なユーザー認証、商品閲覧、カート管理、顧客向けメッセージ機能を備え、販売者は商品やプロフィールを管理可能。リアルタイムで動的コンテンツを提供し、役割ベースのアクセス制御で快適なショッピング体験を実現します。",
            tags: ["PHP", "PhpMyAdmin", "Dashboard", "CSS"],
            viewLink: "",
            githubLink: "https://github.com/ShivamChikara1611/sneakinn-php",
        },
    ]

};

export default function Projects() {
    const { language } = useContext(AppContext);
    const projects = projectsData[language];
    const [index, setIndex] = useState(0);
    const cardsRef = useRef([]);
    const intervalRef = useRef(null);

    const total = projects.length;

    // Animate positions
    const updateCarousel = (activeIndex) => {
        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            // Distance from active
            let offset = i - activeIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            let x = offset * 300; // horizontal spacing
            let z = -Math.abs(offset) * 200; // push farther away
            let scale = offset === 0 ? 1 : 0.8; // center big
            let opacity = offset === 0 ? 1 : 0.4; // center bright

            gsap.to(card, {
                x,
                z,
                scale,
                opacity,
                duration: 0.8,
                ease: "power3.inOut",
            });
        });
    };

    // Auto change card
    const startAuto = () => {
        intervalRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % total);
        }, 2000);
    };

    const stopAuto = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => {
        updateCarousel(index);
    }, [index, language]);

    useEffect(() => {
        startAuto();
        return () => stopAuto();
    }, [total]);

    return (
        <section id="projects" className="text-white relative">
            <div className="max-w-2xl mx-auto px-6">
                <h2 className="text-white text-center mb-5 font-black text-4xl sm:text-5xl md:text-6xl">
                    {language === "en" ? "Projects" : "プロジェクト"}
                </h2>

                <div
                    className="relative flex justify-center items-center h-[420px] w-full mx-auto perspective-[2000px]"
                    style={{ transformStyle: "preserve-3d" }}
                    onMouseEnter={stopAuto}
                    onMouseLeave={startAuto}
                >
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => (cardsRef.current[i] = el)}
                            className="absolute w-[300px] bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 rounded-xl shadow-lg cursor-pointer overflow-hidden"
                            style={{
                                transformStyle: "preserve-3d",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            {/* Image */}
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full object-cover mb-2"
                            />

                            <div className="px-3">
                                <h3 className="text-xl tracking-wider font-semibold mb-1">
                                    {project.name}
                                </h3>
                                <p className="text-gray-200 text-sm font-thin mb-3 line-clamp-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap justify-start gap-1 mb-4">
                                    {project.tags.map((tag, j) => (
                                        <span
                                            key={j}
                                            className="text-xs bg-primary/40 px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Buttons */}
                            <div className="flex gap-1 justify-center absolute top-2 right-2">
                                <a
                                    href={project.viewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary/70 rounded-full p-2 flex items-center justify-center"
                                >
                                    <AttachFileIcon />
                                </a>
                                <a
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-800 rounded-full p-2 flex items-center justify-center"
                                >
                                    <GitHubIcon />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}