import React from 'react'
import Banner from '../components/Banner'
import Overview from '../components/Overview'
import Education from '../components/Education'
import Stats from '../components/Stats'

const Home = () => {
    return (
        <div>
            <Banner/>
            <Overview/>
            <Education/>
            <Stats/>
        </div>
    )
}

export default Home