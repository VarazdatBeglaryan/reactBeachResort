import React, { useState, useContext } from 'react'
import { RoomContext } from '../Context';
import defaultBcg from "../images/room-10.jpeg";
import Banner from '../components/Banner';
import { Link } from "react-router-dom"
import StyledHero from '../components/StyledHero';


const SingleRoom = (props) => {
    const [state, setState] = useState({
        slug: props.match.params.id,
        defaultBcg
    })

    const contextType = useContext(RoomContext)


    let { getRoom } = contextType

    let room = getRoom(state.slug)

    if (!room) {
        return (
            <div className="error">
                <h3>no such room could be found...</h3>
                <Link to="/rooms" className="btn-primary">
                    back to rooms
                </Link>
            </div>
        )
    }

    const { name, description, capacity, pets, size, price, extras, breakfast, images } = room;
    const [mainImg, ...defaultImg] = images
    return (
        <>
            <StyledHero img={mainImg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">
                        back to rooms
                </Link>
                </Banner>
            </StyledHero>

            <section className="single-room">
                <div className="single-room-images" >
                    {defaultImg.map((image, index) => (
                        <img key={index} src={image} alt={image.name} />
                    ))}
                </div>

                <div className="single-room-info" >
                    <article className="desc">
                        <h3> details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>Info</h3>
                        <h6>price : ${price}</h6>
                        <h6>size : {size}</h6>
                        <h6>
                            max capacity : {
                                capacity > 1 ? `${capacity} people` : `${capacity} person`
                            }
                        </h6>
                        <h6>{pets ? `pets allowed` : `no pets allowed`}</h6>
                        <h6>{breakfast && `free breakfast included`}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras" >
                    {extras.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default SingleRoom
