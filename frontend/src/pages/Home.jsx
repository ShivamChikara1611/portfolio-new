import React from 'react'
import Banner from '../components/Banner'
import Overview from '../components/Overview'
import Education from '../components/Education'
import Stats from '../components/Stats'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

const Home = () => {
    return (
        <div>
            <Banner/>
            <Overview/>
            <Education/>
            <Stats/>
            <Projects/>
            <Skills/>
        </div>
    )
}

export default Home