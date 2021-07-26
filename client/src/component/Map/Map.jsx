import React from "react";
import { useState, useEffect } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import axios from "axios";
import TimeAgo from "timeago-react";
import Register from '../Register/Register'
import Login from '../Login/Login'
import "./map.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaG9yYWJveSIsImEiOiJja3JpbDM1aWYwZ3doMnVydmE5cGZueWF6In0.pWnyF-dor3lVOwdMja1wwg"; // Set your mapbox token here

const Map = () => {
  const myStorage = window.localStorage
  const [currentUser, setCurrentUser] = useState(myStorage.getItem('user'))
  const [pins, setPins] = useState([]);
  const [openedPopupId, setOpenedPopId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 48,
    longitude: 2,
    zoom: 4,
    bearing: 0,
    pitch: 0,
    transitionDuration: "200",
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("api/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleClick = (id, longitude, latitude) => {
    setOpenedPopId(id);
    setViewport({
      ...viewport,
      longitude,
      latitude,
    });
  };

  const handleAddPlace = (e) => {
    console.log('hey')
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      longitude,
      latitude,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      longitude: newPlace.longitude,
      latitude: newPlace.latitude,
    };
    try {
      const res = await axios.post("/api/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      throw err;
    }
  };

  const handleLogout = () => {
    myStorage.removeItem('user')
    setCurrentUser(null)
  }



  return (
    <MapGL
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      doubleClickZoom = {false}
      mapStyle="mapbox://styles/horaboy/ckrinuau31llm17llpgcfusym"
      onDblClick={handleAddPlace}
    >
      {pins
        ? pins.map((pin) => (
            <div key={pin._id}>
              <Marker
                latitude={pin.latitude}
                longitude={pin.longitude}
                offsetLeft={-viewport.zoom * 4}
                offsetTop={-viewport.zoom * 8}
                transform={`translate(${-4}px,${-8}px)`}

              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 8,
                    color: pin.username === currentUser ? "tomato" : "blue",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    handleClick(pin._id, pin.longitude, pin.latitude)
                  }
                />
              </Marker>
              {pin._id === openedPopupId && (
                <Popup
                  latitude={pin.latitude}
                  longitude={pin.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setOpenedPopId(null)}
                  anchor="left"
                  tipSize={12}
                >
                  <div className="card">
                    <label>Place</label>
                    <h4>{pin.title}</h4>
                    <label>Review</label>
                    <p className="desc">{pin.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(pin.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="createdby">
                      Created by <b>{pin.username}</b>
                    </span>
                    <span className="date">
                      <TimeAgo datetime={pin.createdAt} />
                    </span>
                  </div>
                </Popup>
              )}
              {newPlace && (
                <Popup
                  latitude={newPlace.latitude}
                  longitude={newPlace.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setNewPlace(null)}
                  anchor="left"
                  tipSize={12}
                >
                  <div>
                    <form className = 'popup_form' onSubmit={(e) => handleSubmit(e)}>
                      <label>Title</label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter a title"
                      />
                      <label>Review</label>
                      <textarea
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Drop a review"
                      />
                      <label>Rating</label>
                      <select
                        onChange={(e) => setRating(e.target.value)}
                        style={{ borderTop: "1px solid gray" }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button className="submitButton" type="submit">
                        Add Pin
                      </button>
                    </form>
                  </div>
                </Popup>
              )}
            </div>
          ))
        : null}

      {currentUser ? (<button className="button logout" onClick = {handleLogout}>Logout</button>) : (<div className="authButton">
        <button onClick = {() => setShowLogin(true)} className="button login">Login</button>
        <button onClick = {() => setShowRegister(true)} className="button register">Register</button>
      </div>)
      }
      {showRegister && <Register setShowRegister ={setShowRegister}/>}
      {showLogin && <Login setShowLogin ={setShowLogin} myStorage = {myStorage} setCurrentUser = {setCurrentUser}/>}
    </MapGL>
  );
};

export default Map;
