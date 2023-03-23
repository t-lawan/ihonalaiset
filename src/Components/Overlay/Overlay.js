import React, { useState, useEffect, useRef, Component } from "react";
import styled from "styled-components";
import { WORK_GROUP_LIST } from "../../Utility/Data/ItemList";
import { Colours } from "../Global/Global.styles";

const OverlayWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: black;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const VideoIFrame = styled.iframe`
  width: 100vw;
  height: 100vh;
`;
const Title = styled.h1`
  color: ${Colours.neon_green};
`;
const Text = styled.p`
  color: white;
`;

const DownloadLink = styled.p`
    color: ${Colours.neon_green};
    cursor: pointer;
`

const WorkGroupItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const WorkGroupWrapper = styled.div`
 color: white;
`

const TextWrapper = styled.div`
	padding: 1rem;
	width: 50%;
  align-self: flex-start;
`

const CloseOverlay = styled.p`
  color: ${Colours.neon_green};
  cursor: pointer;
  position: absolute;
  top: 2.5%;
`;

const Overlay = (props) => {

  const [showCredits, setShowCredits] = useState(false);

  const onClick = () => {
    props.hide();
  };

  const toggleShowCredits = () => {
    setShowCredits(!showCredits);
  }

  const workGroupToggle = (
    <WorkGroupWrapper>
      {WORK_GROUP_LIST.map((workGroup, index) => (
        <WorkGroupItemWrapper key={index}>
          <Text>{workGroup.title}</Text>
          <Text>{workGroup.name}</Text>

        </WorkGroupItemWrapper>
      ))}

    </WorkGroupWrapper>  )
  return (
    <OverlayWrapper show={props.show}>
      <FlexWrapper>
        <CloseOverlay onClick={() => onClick()}> BACK </CloseOverlay>
        {/*  Render Video element */}

        {props.item &&
        props.item.type === "VIDEO" &&
        props.item.video_url ? (
          <VideoIFrame
            src={props.item.video_url}
            title={props.item.title}
            frameBorder="0"
            allowFullScreen={true}
          />
        ) : null}

        {props.item &&
        props.item.type === "TEXT" &&
        props.item.text ? (
			<TextWrapper>
				<Title> {props.item.title}</Title>
        <Text> {props.item.text}</Text>
				<DownloadLink onClick={() => toggleShowCredits()}> Work Group </DownloadLink>
        {showCredits ? workGroupToggle : null}
			</TextWrapper>
        ) : null}
      </FlexWrapper>
    </OverlayWrapper>
  );
};

export default Overlay;
