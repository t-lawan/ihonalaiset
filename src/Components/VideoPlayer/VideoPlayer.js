import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { Colours, size } from "../Global/Global.styles";
import Vimeo from "@u-wave/react-vimeo";

const VideoPlayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const VideoPlayerFallbackWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 20%;
  background: transparent;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  color: ${Colours.neon_green};
`;

const VideoPlayer = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    return () => {
      console.log("CLOSED");
    };
  }, [props.isOverlayVisible]); // Empty dependency array means this effect will only run once (on mount)

  const onClick = () => {
    pause();
    props.hide();
  };

  const onPlay = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    props.onMouseMove();
    setIsPlaying(false);
  };

  const onReady = (x) => {
    setIsVideoReady(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  return (
    <VideoPlayerWrapper onMouseMove={props.onMouseMove}>
      <Vimeo
        color={Colours.neon_green}
        muted={false}
        volume={1}
        responsive={true}
        onPlay={onPlay}
        onPause={onPause}
        onLoaded={onReady}
        video={props.url}
        controls={true}
        
      />
      {!isVideoReady ? (
        <VideoPlayerFallbackWrapper>
          <LoadingText> loading..</LoadingText>{" "}
        </VideoPlayerFallbackWrapper>
      ) : null}
    </VideoPlayerWrapper>
  );
};

export default VideoPlayer;
