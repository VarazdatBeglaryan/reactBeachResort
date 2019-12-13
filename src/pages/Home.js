import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import { Link } from "react-router-dom"
import Services from '../components/Services'
import FeauturedRooms from '../components/FeauturedRooms'

const Home = () => {
    return (
        <>
            <Hero>
                <Banner title="luxurious rooms" subtitle="delux rooms starting from $299">
                    <Link to="/rooms" className="btn-primary">
                        All Rooms
                </Link>
                </Banner>
            </Hero>
            <Services />
            <FeauturedRooms />
        </>
    )
}

export default Home
