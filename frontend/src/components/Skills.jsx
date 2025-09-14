import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import assets from "../assets/assets";

export default function Skills() {
    const { language } = useContext(AppContext);
    const sectionRef = useRef(null);

    const [nodes, setNodes] = useState([]);
    const [activeDomain, setActiveDomain] = useState(null);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [tooltip, setTooltip] = useState({ visible: false, text: '', x: 0, y: 0 });

    const domainRadius = 40;
    const childRadius = 30;
    const minEdgeLength = 100;
    const padding = 20;
    const animationDuration = 500;

    // Image sizing - increased for better visibility
    const domainImageSize = domainRadius * 1.6;
    const childImageSize = childRadius * 1.6;

    // Updated skills data with image paths
    const skillsData = {
        en: [
            {
                domain: "Languages",
                image: `${assets.languages}`,
                skills: [
                    { name: "C++", image: `${assets.cpp}` },
                    { name: "Java", image: `${assets.java}` },
                    { name: "Python", image: `${assets.python}` },
                    { name: "PHP", image: `${assets.php}` },
                    { name: "JavaScript", image: `${assets.javascript}` }
                ]
            },
            {
                domain: "Frontend",
                image: `${assets.frontend}`,
                skills: [
                    { name: "HTML", image: `${assets.html}` },
                    { name: "CSS", image: `${assets.css}` },
                    { name: "Bootstrap", image: `${assets.bootstrap}` },
                    { name: "TailwindCSS", image: `${assets.tailwindcss}` },
                    { name: "Material UI", image: `${assets.mui}` },
                    { name: "React Js", image: `${assets.react}` },
                    { name: "Three Js", image: `${assets.threejs}` }
                ]
            },
            {
                domain: "Backend",
                image: `${assets.backend}`,
                skills: [
                    { name: "Node Js", image: `${assets.node}` },
                    { name: "Express Js", image: `${assets.express}` },
                    { name: "Spring", image: `${assets.spring}` },
                    { name: "Springboot", image: `${assets.springboot}` },
                    { name: "RestFull API", image: `${assets.api}` }
                ]
            },
            {
                domain: "Database",
                image: `${assets.database}`,
                skills: [
                    { name: "MySQL", image: `${assets.mysql}` },
                    { name: "PostgreSQL", image: `${assets.postgresql}` },
                    { name: "MongoDB", image: `${assets.mongodb}` }
                ]
            },
            {
                domain: "Cloud",
                image: `${assets.cloud}`,
                skills: [
                    { name: "AWS", image: `${assets.aws}` },
                    { name: "Azure", image: `${assets.azure}` }
                ]
            },
            {
                domain: "DevOps & Tools",
                image: `${assets.devops}`,
                skills: [
                    { name: "Docker", image: `${assets.docker}` },
                    { name: "Linux", image: `${assets.linux}` },
                    { name: "Git", image: `${assets.git}` },
                    { name: "GitHub", image: `${assets.github}` },
                    { name: "Postman", image: `${assets.postman}` },
                ]
            },
        ],
        jp: [
            {
                domain: "プログラミング言語",
                image: `${assets.languages}`,
                skills: [
                    { name: "C++", image: `${assets.cpp}` },
                    { name: "Java", image: `${assets.java}` },
                    { name: "Python", image: `${assets.python}` },
                    { name: "PHP", image: `${assets.php}` },
                    { name: "JavaScript", image: `${assets.javascript}` }
                ]
            },
            {
                domain: "フロントエンド",
                image: `${assets.frontend}`,
                skills: [
                    { name: "HTML", image: `${assets.html}` },
                    { name: "CSS", image: `${assets.css}` },
                    { name: "ブートストラップ", image: `${assets.bootstrap}` },
                    { name: "TailwindCSS", image: `${assets.tailwindcss}` },
                    { name: "マテリアルUI", image: `${assets.mui}` },
                    { name: "React Js", image: `${assets.react}` },
                    { name: "Three Js", image: `${assets.threejs}` }
                ]
            },
            {
                domain: "バックエンド",
                image: `${assets.backend}`,
                skills: [
                    { name: "Node Js", image: `${assets.node}` },
                    { name: "Express Js", image: `${assets.express}` },
                    { name: "Spring", image: `${assets.spring}` },
                    { name: "Springboot", image: `${assets.springboot}` },
                    { name: "RESTful API", image: `${assets.api}` }
                ]
            },
            {
                domain: "データベース",
                image: `${assets.database}`,
                skills: [
                    { name: "MySQL", image: `${assets.mysql}` },
                    { name: "PostgreSQL", image: `${assets.postgresql}` },
                    { name: "MongoDB", image: `${assets.mongodb}` }
                ]
            },
            {
                domain: "クラウド",
                image: `${assets.cloud}`,
                skills: [
                    { name: "AWS", image: `${assets.aws}` },
                    { name: "Azure", image: `${assets.azure}` }
                ]
            },
            {
                domain: "DevOps・ツール",
                image: `${assets.devops}`,
                skills: [
                    { name: "Docker", image: `${assets.docker}` },
                    { name: "Linux", image: `${assets.linux}` },
                    { name: "Git", image: `${assets.git}` },
                    { name: "GitHub", image: `${assets.github}` },
                    { name: "Postman", image: `${assets.postman}` },
                ]
            },
        ],
    };

    const skills = skillsData[language];

    // Generate initial random positions
    useEffect(() => {
        if (!sectionRef.current) return;
        const { offsetWidth: width, offsetHeight: height } = sectionRef.current;

        const initialNodes = skills.map((item, i) => ({
            id: `domain-${i}`,
            label: item.domain,
            image: item.image,
            children: item.skills,
            x: Math.random() * (width - 2 * domainRadius - padding * 2) + domainRadius + padding,
            y: Math.random() * (height - 2 * domainRadius - padding * 2) + domainRadius + padding,
            vx: 0,
            vy: 0,
        }));

        setNodes(initialNodes);
    }, [language]);

    // Animation effect for smooth transitions
    useEffect(() => {
        if (!isAnimating) return;

        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);

            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setAnimationProgress(easedProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
            }
        };

        requestAnimationFrame(animate);
    }, [isAnimating]);

    // Handle domain click with animation
    const handleDomainClick = (index) => {
        const isCurrentlyActive = index === activeDomain;

        if (isCurrentlyActive) {
            setIsAnimating(true);
            setAnimationProgress(1);
            setTimeout(() => setActiveDomain(null), 0);
        } else {
            setActiveDomain(index);
            setAnimationProgress(0);
            setIsAnimating(true);
        }
    };

    // Tooltip handlers - fixed positioning
    const showTooltip = (text, elementX, elementY) => {
        setTooltip({
            visible: true,
            text: text,
            x: elementX,
            y: elementY - 70 // Fixed offset above the element
        });
    };

    const hideTooltip = () => {
        setTooltip({ visible: false, text: '', x: 0, y: 0 });
    };

    // Force simulation for nodes
    useEffect(() => {
        if (!nodes.length) return;
        const interval = setInterval(() => {
            const updatedNodes = [...nodes];
            const { offsetWidth: width, offsetHeight: height } = sectionRef.current;

            updatedNodes.forEach((node, i) => {
                let fx = 0;
                let fy = 0;

                updatedNodes.forEach((other, j) => {
                    if (i === j) return;
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist =
                        domainRadius * 2 +
                        (activeDomain === j ? minEdgeLength : 0) +
                        padding;

                    if (dist < minDist && dist > 0) {
                        const force = (minDist - dist) * 0.05;
                        fx += (dx / dist) * force;
                        fy += (dy / dist) * force;
                    }
                });

                node.vx = (node.vx + fx) * 0.9;
                node.vy = (node.vy + fy) * 0.9;

                node.x += node.vx;
                node.y += node.vy;

                const maxChildOffset = activeDomain === i ? minEdgeLength : 0;
                node.x = Math.max(domainRadius + padding + maxChildOffset, Math.min(width - domainRadius - padding - maxChildOffset, node.x));
                node.y = Math.max(domainRadius + padding + maxChildOffset, Math.min(height - domainRadius - padding - maxChildOffset, node.y));
            });

            setNodes([...updatedNodes]);
        }, 16);

        return () => clearInterval(interval);
    }, [nodes, activeDomain]);

    const getChildPositions = (domainNode) => {
        const count = domainNode.children.length;
        const angleStep = (2 * Math.PI) / count;
        
        // Responsive edge length based on number of children
        const baseLength = minEdgeLength;
        const responsiveLength = count > 5 ? baseLength * 1.3 : baseLength;
        const currentRadius = responsiveLength * animationProgress;

        return domainNode.children.map((skill, i) => {
            const angle = i * angleStep;
            const x = domainNode.x + Math.cos(angle) * currentRadius;
            const y = domainNode.y + Math.sin(angle) * currentRadius;
            return { x, y, name: skill.name, image: skill.image, angle };
        });
    };

    // Calculate connection points on circle circumference
    const getConnectionPoints = (domain, child) => {
        const dx = child.x - domain.x;
        const dy = child.y - domain.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return { x1: domain.x, y1: domain.y, x2: child.x, y2: child.y };
        
        // Calculate points on circumference
        const domainX = domain.x + (dx / distance) * domainRadius;
        const domainY = domain.y + (dy / distance) * domainRadius;
        
        const childX = child.x - (dx / distance) * (childRadius * (0.3 + 0.7 * animationProgress));
        const childY = child.y - (dy / distance) * (childRadius * (0.3 + 0.7 * animationProgress));
        
        return { x1: domainX, y1: domainY, x2: childX, y2: childY };
    };

    const getAnimationStyles = (index) => {
        const scale = 0.3 + (0.7 * animationProgress);
        const opacity = animationProgress;

        return {
            opacity,
            scale,
        };
    };

    return (
        <section
            id="skills"
            className="mx-auto mt-16 text-white overflow-hidden max-w-[1000px]"
        >
            <h2 className="text-white text-center mb-5 font-black text-4xl sm:text-5xl md:text-6xl">
                {language === "en" ? "Skills" : "スキル"}
            </h2>

            <div ref={sectionRef} className="relative w-full h-[78vh] mx-auto">
                <svg className="absolute inset-0 w-full h-full">
                    {/* Animated Edges - connecting circumference to circumference */}
                    {activeDomain !== null &&
                        nodes
                            .filter((n, i) => i === activeDomain)
                            .map((domain) =>
                                getChildPositions(domain).map((child, j) => {
                                    const connectionPoints = getConnectionPoints(domain, child);
                                    return (
                                        <line
                                            key={`line-${j}`}
                                            x1={connectionPoints.x1}
                                            y1={connectionPoints.y1}
                                            x2={connectionPoints.x2}
                                            y2={connectionPoints.y2}
                                            stroke="rgba(168, 85, 247, 0.8)"
                                            strokeWidth="2"
                                            strokeOpacity={0.7 * animationProgress}
                                            style={{
                                                transition: isAnimating ? 'none' : 'stroke-opacity 0.3s ease-out'
                                            }}
                                        />
                                    );
                                })
                            )}

                    {/* Domains + Animated Children */}
                    {nodes.map((node, i) => {
                        const isActive = i === activeDomain;
                        const childrenPos = isActive ? getChildPositions(node) : [];

                        return (
                            <g key={node.id}>
                                {/* Domain Background Circle */}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={domainRadius}
                                    fill="rgba(30, 30, 46, 0.5)"
                                    className="cursor-pointer"
                                    style={{
                                        filter: isActive
                                            ? 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.9))'
                                            : 'drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4))',
                                        transition: 'filter 0.3s ease-out'
                                    }}
                                    onClick={() => handleDomainClick(i)}
                                    onMouseEnter={() => showTooltip(node.label, node.x, node.y)}
                                    onMouseLeave={hideTooltip}
                                />

                                {/* Domain Image */}
                                <image
                                    href={node.image}
                                    x={node.x - domainImageSize / 2}
                                    y={node.y - domainImageSize / 2}
                                    width={domainImageSize}
                                    height={domainImageSize}
                                    className="pointer-events-none"
                                    preserveAspectRatio="xMidYMid meet"
                                    style={{
                                        filter: isActive ? 'brightness(1.2)' : 'brightness(1.0)',
                                        transition: 'filter 0.3s ease-out'
                                    }}
                                />

                                {/* Domain border */}
                                <circle
                                    cx={node.x}
                                    cy={node.y}
                                    r={domainRadius}
                                    fill="none"
                                    stroke={isActive ? "rgb(168, 85, 247)" : "rgba(255, 255, 255, 0.4)"}
                                    strokeWidth="2.5"
                                    className="pointer-events-none"
                                    style={{
                                        transition: 'stroke 0.3s ease-out'
                                    }}
                                />

                                {/* Animated Children */}
                                {childrenPos.map((child, j) => {
                                    const animStyles = getAnimationStyles(j);
                                    const currentChildRadius = childRadius * animStyles.scale;
                                    const currentChildImageSize = childImageSize * animStyles.scale;

                                    return (
                                        <g
                                            key={`child-${j}`}
                                            style={{
                                                opacity: animStyles.opacity,
                                            }}
                                        >
                                            {/* Child Background Circle */}
                                            <circle
                                                cx={child.x}
                                                cy={child.y}
                                                r={currentChildRadius}
                                                fill="rgba(255, 255, 255, 0.1)"
                                                style={{
                                                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
                                                    transition: isAnimating ? 'none' : 'r 0.3s ease-out'
                                                }}
                                                onMouseEnter={() => showTooltip(child.name, child.x, child.y)}
                                                onMouseLeave={hideTooltip}
                                            />

                                            {/* Child Image */}
                                            <image
                                                href={child.image}
                                                x={child.x - currentChildImageSize / 2}
                                                y={child.y - currentChildImageSize / 2}
                                                width={currentChildImageSize}
                                                height={currentChildImageSize}
                                                className="pointer-events-none"
                                                preserveAspectRatio="xMidYMid meet"
                                                style={{
                                                    filter: 'brightness(1.0)',
                                                    transition: isAnimating ? 'none' : 'width 0.3s ease-out, height 0.3s ease-out'
                                                }}
                                            />

                                            {/* Child border */}
                                            <circle
                                                cx={child.x}
                                                cy={child.y}
                                                r={currentChildRadius}
                                                fill="none"
                                                stroke="rgba(99, 102, 241, 0.6)"
                                                strokeWidth="2"
                                                className="pointer-events-none"
                                                style={{
                                                    transition: isAnimating ? 'none' : 'r 0.3s ease-out'
                                                }}
                                            />
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>

                {/* Custom Tooltip */}
                {tooltip.visible && (
                    <div
                        className="absolute pointer-events-none z-10 bg-gray-900/95 text-white px-3 py-2 rounded-lg shadow-xl text-sm font-medium border border-gray-600 backdrop-blur-sm"
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: 'translateX(-50%)',
                            maxWidth: '200px',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        <div className="relative">
                            {tooltip.text}
                            {/* Tooltip arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900"></div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}