import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Certificates() {
    const { language } = useContext(AppContext);

    const texts = {
        en: {
        },
        jp: {
        },
    };

    return (
        <section
            id="certificates"
            className="mx-auto mt-16 text-white overflow-hidden max-w-[1200px]"
        >
            <h2 className="text-white text-center mb-5 font-black text-4xl sm:text-5xl md:text-6xl">
                {language === "en" ? "Certifications" : "認証"}
            </h2>

            <p className="text-center font-thin text-xl my-5 text-gray-400">Under Development phase!</p>
        </section>
    );
}
