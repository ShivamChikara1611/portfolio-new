import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Overview() {
    const { language } = useContext(AppContext);

    const texts = {
        en: {
            about: `I’m Shivam Chikara, a passionate Fullstack Developer experienced in building scalable web applications and modern user interfaces. My expertise spans MERN, Python, and Java, while I am also exploring Spring Boot. With a strong foundation in Data Structures & Algorithms, databases, REST APIs, and cloud deployment, I strive to create efficient, reliable, and user-focused solutions.`,
            philosophy: "- Code with clarity, build with passion, Serve to Society!",
            funfact: "- When I’m not coding, I enjoy exploring Japanese culture, anime, and local cuisines.",
        },
        jp: {
            about: `私はシワム・チカラと申します。情熱を持つフルスタック開発者であり、スケーラブルなWebアプリケーションやモダンなユーザーインターフェースの構築に携わってきました。MERN、Python、Javaに精通しており、現在はSpring Bootにも取り組んでいます。データ構造とアルゴリズム、データベース、REST API、クラウド展開に強い基盤を持ち、効率的で信頼性が高く、ユーザー重視のソリューションを提供することを目指しています。`,
            philosophy: "- 明確にコードを書き、情熱を持って構築し、社会に貢献する！",
            funfact: "- コーディングをしていないときは、日本文化、アニメ、そして地元の料理を楽しんでいます。",
        },
    };

    return (
        <section
            id="overview"
            className="relative flex items-center justify-center px-6 md:px-16 pb-20"
        >
            <div className="max-w-4xl w-full">
                <div className="text-center mb-5 md:mb-12">
                <h2 className="text-white font-black text-4xl sm:text-5xl md:text-6xl">
                    {language === "en" ? "Overview" : "自己紹介"}
                </h2>
            </div>
                {/* About */}
                <p className="tracking-wide text-md md:text-2xl font-extralight text-gray-300 text-center">
                    {texts[language].about}
                </p>

                {/* Philosophy */}
                <p className="text-sm md:text-xl italic font-thin text-gray-300 my-6">
                    {texts[language].philosophy}
                </p>

                {/* Fun Fact */}
                <p className="text-xs md:text-lg italic text-primary font-light text-end">
                    {texts[language].funfact}
                </p>
            </div>
        </section>
    );
}
