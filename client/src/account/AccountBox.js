import styled from "styled-components";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import {motion} from "framer-motion"
import { useState } from "react";
import { AccountContext } from "./AccountContext";

import map_background from "../assets/images/map-background.gif"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { geoCentroid } from "d3-geo"
import allIslands from '../data/islands.json'


const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/us-states/HI-15-hawaii-counties.json"


export function AccountBox() {
    const [isExpanded, setExpanded] = useState(false)
    const [active, setActive] = useState("login")

    // change and toggle the animation
    const playExpandingAnimation = () => {
        setExpanded(true);
        // set isExpanded to false 2.3s after
        setTimeout(() => {
            setExpanded(false);
          }, expandingTransition.duration * 1000 - 1500);
    }

    // == create functions to switch to login and signup ====
    const switchToSignup = () => {
        playExpandingAnimation();
        setTimeout(() => {
          setActive("signup");
        }, 400);
    };
    
    const switchToLogin = () => {
        playExpandingAnimation();
        setTimeout(() => {
            setActive("login");
        }, 400);
    };
    // console.log(active)
    // ======================================================

    // create context values
    const contextValue = {switchToSignup, switchToLogin}

    return (
        <AppContainer>
            
            {/* use AccountContext to spread the context value, make the child components below being able to access context values */}
            <AccountContext.Provider value={contextValue}>
                <MapContainer>
                    {/* <img src={bg} alt="map"/> */}
                    <ComposableMap
                        viewBox="0 0 138 105"
                        projection={"geoAlbers"}
                        height={180}
                        width={180}
                        projectionConfig={{ 
                            center: [-94.4, -328.8], 
                            scale: 1450,
                            rotate: [93, 60.0, 0]
                        }}>
                                   
                        <Geographies geography={geoUrl}>
                            {({ geographies }) => (
                                <>
                                    {geographies.map((geo) => (
                                        <Geography 
                                            key={geo.rsmKey} 
                                            geography={geo}
                                            fill="#ff7675"
                                            style={{
                                                default: {
                                                    fill:"#ff7675",
                                                    outline: 'none'
                                                },
                                                hover: {
                                                    fill: "#e17055",
                                                    outline: 'none',
                                                    transform: 'scale(1.2)'
                                                },
                                                pressed: {
                                                    outline: 'none'
                                                }
                                            }}
                                        />
                                    ))}

                                    {geographies.map(geo => {
                                        console.log(geo)
                                        const centroid = geoCentroid(geo)
                                        const cur_island = allIslands.find(island => {
                                            return island.val === geo.properties["COUNTYFP"]
                                        })
                                        
                                        // console.log(centroid)
                                        // console.log(cur_island.id) 

                                        return (
                                            <g>
                                                {
                                                    cur_island && centroid[0] > -160 && centroid[0] < -67 &&
                                                    (
                                                        <Marker coordinates={centroid}>
                                                            <text y="2" fontSize={4} textAnchor="middle">
                                                                {cur_island.id}
                                                            </text>
                                                        </Marker>
                                                    )
                                                    
                                                }
                                            </g>
                                        )
                         
                                    })}
                                </>
                            )}
                        </Geographies>
                    </ComposableMap>
                </MapContainer>
                
                <BoxContainer>
                    {active === "login" && (
                        <HeaderContainer>
                            <HeaderText>Hawaiian</HeaderText>
                            <HeaderText>Reader</HeaderText>
                            <SmallText>Please sign-in to continue!</SmallText>
                        </HeaderContainer>
                    )}

                    {active === "signup" && (
                        <HeaderContainer>
                            <HeaderText>Create</HeaderText>
                            <HeaderText>Account</HeaderText>
                            <SmallText>Please sign-up to continue!</SmallText>
                        </HeaderContainer>
                    )}

                    <InnerContainer>
                        {active === "login" && <LoginForm/>}
                        {active === "signup" && <SignupForm/>}
                    </InnerContainer>
                </BoxContainer>
            </AccountContext.Provider>
        </AppContainer>
    )
}




const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #85D2D0;
    background-image: url("${map_background}");
    // background-repeat: repeat;
    // background-size: 60%;
    box-sizing: border-box;
    padding-right: 50px;

`;

const MapContainer = styled.div`
    max-width: 750px;
    width:75%;
    margin-top: 50px;
    margin-right: 50px;
`

const BoxContainer = styled.div`
    width: 280px;
    margin-top:50px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #fff;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
`;


// for create account or welcome text
const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    display: block;
    margin: 80px 0;
`

const HeaderText = styled.h2`
    font-size: 30px;
    font-weight: 600;
    line-height: 1.24;
    color: #222;
    z-index: 10;
    margin: 0;
`

const SmallText = styled.h5`
    color: #222;
    font-weight: 500;
    font-size: 11px;
    z-index: 10;
    margin: 0;
    margin-top: 7px;
`

const InnerContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 1.8em;
    // prevent padding (Signin&Login button) from making 100% width extend beyond InnerContainer
    box-sizing: border-box;
`

// config for the transition, after 2.3s, it starts collapsing again
const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };
