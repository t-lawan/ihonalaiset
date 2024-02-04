import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Colours, size } from "../Global/Global.styles";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import AboutText from "../AboutText/AboutText";

const CloseOverlay = styled.p`
  color: ${Colours.neon_green};
  cursor: pointer;
  position: absolute;
  top: 2.5%;
  z-index: 100;
  animation: ${props => (props.isMouseMoving ? "fade-in 0.5s forwards" : "fade-out 1s forwards")}  ;
`;



const OverlayWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: black;
  z-index: 100;

`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const OverlaySection = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${Colours.neon_green};
`;
const Text = styled.p`
  color: white;
  margin-bottom: 0.5rem;
`;

const TextWrapper = styled.div`
  padding: 1rem;
  width: 50%;
  align-self: flex-start;
  position: absolute;
  top: 20%;
  @media (max-width: ${size.tablet}) {
    width: 100%;
    top: 5%;
  }
`;






const Overlay = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  let timeoutId = null;
  useEffect(() => {
    console.log("CLOSED")
    setIsVisible(true);
  }, []);

  const handleMouseEnter = () => {
    setIsMouseMoving(true);
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setIsMouseMoving(false);
    }, 3000); // 10 seconds
  };
  const onClick = () => {
    setIsVisible(false)
    // pause();
    props.hide();
  };
  return (
    <OverlayWrapper show={props.show}>
      <FlexWrapper>
        <CloseOverlay isMouseMoving={isMouseMoving} onClick={() => onClick()}> BACK </CloseOverlay>
        {/*  Render Video element */}

        {props.item && props.item.type === "VIDEO" && props.item.video_url ? (
          <>
            <VideoPlayer onMouseMove={handleMouseEnter} url={props.item.video_url} isOverlayVisible={isVisible}/>
          </>
        ) : null}

        {props.item && props.item.type === "TEXT" && props.item.text ? (
          <AboutText title={props.item.title} text={props.item.text}/>
        ) : null}
      </FlexWrapper>
    </OverlayWrapper>
  );
};

export default Overlay;
