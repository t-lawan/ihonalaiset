import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Colours, size } from "../Global/Global.styles";
import ReactPlayer from "react-player";

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

const CloseOverlay = styled.p`
  color: ${Colours.neon_green};
  cursor: pointer;
  position: absolute;
  top: 2.5%;
`;

const Overlay = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  let videoPlayer = useRef(null);

  const onClick = () => {
    pause();
    props.hide();
  };

  const onPlay = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const toggleShowCredits = () => {
    setShowCredits(!showCredits);
  };

  return (
    <OverlayWrapper show={props.show}>
      <FlexWrapper>
        <CloseOverlay onClick={() => onClick()}> BACK </CloseOverlay>
        {/*  Render Video element */}

        {props.item && props.item.type === "VIDEO" && props.item.video_url ? (
          <ReactPlayer
            playing={isPlaying}
            onPlay={onPlay}
            url={props.item.video_url}
            controls={true}
            stopOnUnmount={true}
            ref={videoPlayer}
            width={`100%`}
            height={`100%`}
          />
        ) : null}

        {props.item && props.item.type === "TEXT" && props.item.text ? (
          <TextWrapper>
            <OverlaySection>
              <Title> {props.item.title}</Title>
              <Text> {props.item.text}</Text>
            </OverlaySection>

            <OverlaySection>
              <Title ref={videoPlayer} onClick={() => toggleShowCredits()}>
                {" "}
                Workgroup{" "}
              </Title>
              {showCredits ? (
                <>
                  <Text> Film by Vilja Achté</Text>
                  <Text> Based on a story by Kanerva Lehtonen</Text>
                  <Text>
                    {" "}
                    Screenwriting by Vilja Achté and Kanerva Lehtonen
                  </Text>
                  <Text> Sound design and composition by Lauri Achté</Text>
                  <Text> Narration by Inka Achté</Text>
                  <Text> Translation by Maija Timonen</Text>
                  <Text> Website by Thomas Lawanson</Text>
                  <Text> Logo design by Hanna Valle</Text>
                  <Text> With the support of The Finnish Cultural Foundation, Grafia and The Arts Promotion Centre Finland</Text>
                </>
              ) : null}
            </OverlaySection>
          </TextWrapper>
        ) : null}
      </FlexWrapper>
    </OverlayWrapper>
  );
};

export default Overlay;
