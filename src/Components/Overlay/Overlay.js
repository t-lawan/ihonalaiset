import React, { useState, useEffect, useRef, Component } from 'react';
import styled from 'styled-components';
import { Colours } from '../Global/Global.styles';

const OverlayWrapper = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	background: black;
	display: ${(props) => (props.show ? 'block' : 'none')};
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

const Title = styled.h1`color: ${Colours.neon_green};;`;

const CloseOverlay = styled.p`
	color: ${Colours.neon_green};
	cursor: pointer;
	position: absolute;
	top: 2.5%;
`

const Overlay = (props) => {
	const onClick = () => {
		props.hide();
	};
	return (
		<OverlayWrapper show={props.show} >

				
			<FlexWrapper>
				<CloseOverlay onClick={() => onClick()}> BACK </CloseOverlay>
				{/*  Render Video element */}

				{props.project && props.project.type == 'VIDEO' && props.project.video_url ? (
					<VideoIFrame
						src={props.project.video_url}
						title={props.project.title}
						frameBorder="0"
						allowFullScreen={true}
					/>
				) : null}
			</FlexWrapper>
		</OverlayWrapper>
	);
};

export default Overlay;
