// import React, { useState, createContext, useEffect } from 'react';
// import items from "./data"

// const RoomContext = createContext();

// const RoomProvider = ({ children }) => {


//   const [roomsAPI, setRoomsAPI] = useState({
//     rooms: [],
//     sortedRooms: [],
//     feauturedRooms: [],
//     loading: true,
//     type: "all",
//     capacity: 1,
//     price: 0,
//     minPrice: 0,
//     maxPrice: 0,
//     minSize: 0,
//     maxSize: 0,
//     pets: false,
//     breakfast: false
//   });


//   const formatData = (items) => {
//     let tempItems = items.map(item => {
//       let id = item.sys.id;
//       let images = item.fields.images.map(image => image.fields.file.url);
//       let room = { ...item.fields, images, id };
//       return room
//     })
//     return tempItems
//   }

//   const getRoom = (slug) => {
//     let tempRooms = [...roomsAPI.rooms];
//     const room = tempRooms.find(room => room.slug === slug)
//     return room
//   }

//   const handleChange = event => {
//     const target = event.target
//     const name = event.target.name
//     const value = event.type === "checkbox" ? target.checked : target.value

//     setRoomsAPI({
//       ...roomsAPI,
//       [name]: value
//     });

//   }

//   const filterRooms = () => {
//     let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = roomsAPI

//     let tempRooms = [...rooms];
//     if (type !== "all") {
//       tempRooms = tempRooms.filter(room => room.type === type)
//     }

//     setRoomsAPI({
//       ...roomsAPI,
//       sortedRooms: tempRooms
//     })

//   }

//   useEffect(() => {
//     let rooms = formatData(items)
//     let feauturedRooms = rooms.filter(room => room.featured === true)
//     let maxPrice = Math.max(...rooms.map((item) => item.price))
//     let maxSize = Math.max(...rooms.map((item) => item.size))
//     setRoomsAPI({
//       ...roomsAPI,
//       rooms,
//       feauturedRooms,
//       sortedRooms: rooms,
//       loading: false,
//       price: maxPrice,
//       maxPrice,
//       maxSize
//     })
//   }, [])

//   return (
//     <RoomContext.Provider value={{ ...roomsAPI, getRoom, handleChange }}>
//       {children}
//     </RoomContext.Provider>
//   )
// }

// const RoomConsumer = RoomContext.Consumer;



// export { RoomProvider, RoomContext, RoomConsumer }

import React, { Component } from "react";
// import items from "./data";
import Client from "./ContentFull";




const RoomContext = React.createContext();

export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    //
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };
  //GET DATA
  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResprtExample"
      })
      let rooms = this.formatData(response.items);
      let featuredRooms = rooms.filter(room => room.featured === true);
      //
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        //
        price: maxPrice,
        maxPrice,
        maxSize
      });
    } catch (error) {
      console.log(error);

    }
  }

  componentDidMount() {
    this.getData()
    // let rooms = this.formatData(items);
    // let featuredRooms = rooms.filter(room => room.featured === true);
    // //
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));
    // this.setState({
    //   rooms,
    //   featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   //
    //   price: maxPrice,
    //   maxPrice,
    //   maxSize
    // });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }
  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(name, value);

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };
  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;
    //ALL ROOMS
    let tempRooms = [...rooms];
    // VALUE TRANFORM 
    capacity = parseInt(capacity)
    price = parseInt(price)

    //FILTER BY TYPE
    if (type !== "all") {
      tempRooms = tempRooms.filter(room => room.type === type)
    }

    //Filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room => room.capacity >= capacity))
    }
    //FITER BY PRICE
    if (price < 600) {
      tempRooms = tempRooms.filter(room => room.price <= price)
    }
    //FILTER BY SIZE
    tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize)
    //Filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true)
    }
    //Filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true)
    }


    this.setState({
      sortedRooms: tempRooms
    })

  };
  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}