import React, { useState } from 'react'
import Title from './Title'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa"


const Services = () => {

    const [services, setServices] = useState([
        {
            icon: <FaCocktail />,
            title: "free cocktails",
            info: "Lorem ipsum dolar sit amet consecteture adipat elit. Magni corproi!",
        },
        {
            icon: <FaHiking />,
            title: "Endless Hiking",
            info: "Lorem ipsum dolar sit amet consecteture adipat elit. Magni corproi!",
        },
        {
            icon: <FaShuttleVan />,
            title: "free shuttle",
            info: "Lorem ipsum dolar sit amet consecteture adipat elit. Magni corproi!",
        },
        {
            icon: <FaBeer />,
            title: "best beer",
            info: "Lorem ipsum dolar sit amet consecteture adipat elit. Magni corproi!",
        }
    ])


    return (
        <section className="services">
            <Title title="services" />
            <div className="services-center">
                {
                    services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })
                }
            </div>
        </section>
    )
}

export default Services
