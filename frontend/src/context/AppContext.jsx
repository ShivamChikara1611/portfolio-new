import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "jp" : "en"));
    };

    return (
        <AppContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
