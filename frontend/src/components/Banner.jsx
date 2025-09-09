import { useEffect, useRef, useContext } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AppContext } from "../context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const splitTextToSpans = (str) =>
    str.split("").map((ch, i) => (
        <span key={i} className="inline-block will-change-transform">
            {ch === " " ? "\u00A0" : ch}
        </span>
    ));

export default function Banner() {
    const { language } = useContext(AppContext);

    const texts = {
        en: {
            heading: "Shivam Chikara",
            sub: "Fullstack Developer",
            resume: "Download Resume",
        },
        jp: {
            heading: "シワム チカラ",
            sub: "フルスタック開発者",
            resume: "履歴書をダウンロード",
        },
    };

    const rootRef = useRef(null);
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const actionsRef = useRef(null); // resume + socials container

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ---------------------------
            // Intro Animation
            // ---------------------------
            const tlIntro = gsap.timeline({ defaults: { ease: "power3.out" } });

            tlIntro
                .from([headingRef.current, subRef.current], {
                    scale: 0.2,
                    opacity: 0,
                    duration: 2,
                    stagger: 0.2,
                })
                .to(
                    actionsRef.current,
                    { y: 0, opacity: 1, duration: 3, ease: "elastic.out(1, 0.4)" },
                    "-=5"
                );

            // ---------------------------
            // Scroll Animation
            // ---------------------------
            const lettersHeading = headingRef.current.querySelectorAll("span");
            const lettersSub = subRef.current.querySelectorAll("span");

            gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: "top top",
                    end: "+=1500",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
                defaults: { ease: "power3.out" },
            })
                // fade actions out (reversible)
                .fromTo(
                    actionsRef.current,
                    { opacity: 1, y: 0 },
                    { opacity: 0, y: -40, duration: 0.8 }
                )
                // scale heading/subheading (always start at 1)
                .fromTo(
                    [headingRef.current, subRef.current],
                    { scale: 1 },
                    {
                        scale: () => gsap.utils.random(1.2, 1.5),
                        duration: 1,
                        stagger: 0.2,
                    },
                    "+=0.5"
                )
                // breakup heading letters
                .to(
                    lettersHeading,
                    {
                        opacity: 0,
                        rotateZ: () => gsap.utils.random(-30, 30),
                        x: () => gsap.utils.random(-200, 200),
                        y: () => gsap.utils.random(-120, 120),
                        duration: 1.5,
                        stagger: { each: 0.02, from: "random" },
                    },
                    "+=0.2"
                )
                // breakup subheading letters
                .to(
                    lettersSub,
                    {
                        opacity: 0,
                        rotateZ: () => gsap.utils.random(-40, 40),
                        x: () => gsap.utils.random(-160, 160),
                        y: () => gsap.utils.random(-100, 100),
                        duration: 1.1,
                        stagger: { each: 0.02, from: "random" },
                    },
                    "<0.1"
                );
        }, rootRef);

        return () => ctx.revert();
    }, [language]);

    return (
        <section
            ref={rootRef}
            id="home"
            className="relative min-h-[100vh] flex items-center justify-center px-4 md:px-12"
            style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
        >
            <div className="w-full flex flex-col items-center text-center">
                {/* Heading */}
                <h1
                    ref={headingRef}
                    className="font-extrabold leading-[0.9] tracking-wider text-white"
                    style={{ textShadow: "0 10px 40px rgba(0,0,0,0.45)" }}
                >
                    <span className="block text-[23vw] md:text-[8.5vw]">
                        {splitTextToSpans(texts[language].heading)}
                    </span>
                </h1>

                {/* Subheading */}
                <h2
                    ref={subRef}
                    className="mt-3 font-semibold text-secondary"
                    style={{ textShadow: "0 6px 30px rgba(0,0,0,0.35)" }}
                >
                    <span className="block text-[8vw] md:text-[5vw]">
                        {splitTextToSpans(texts[language].sub)}
                    </span>
                </h2>

                {/* Actions: Resume + Socials */}
                <div
                    ref={actionsRef}
                    className="mt-10 flex flex-col items-center gap-8 opacity-0 translate-y-[100px]" // initial hidden
                >
                    <a
                        href="/resume/shivam-chikara-resume.pdf"
                        download
                        className="inline-block bg-third/30 text-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-white/10 active:scale-[0.98] transition"
                    >
                        {texts[language].resume}
                    </a>

                    <div className="flex items-center gap-5 text-white/90">
                        <a
                            href="https://www.linkedin.com/in/shivam-chikara1611/"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <FaLinkedin size={22} />
                        </a>
                        <a
                            href="https://github.com/ShivamChikara1611"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <FaGithub size={22} />
                        </a>
                        <a
                            href="mailto:s.chikara6885@gmail.com"
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
                        >
                            <MdEmail size={22} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
