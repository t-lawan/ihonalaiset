import React from "react";
import styled from 'styled-components'
import Ihonalaiset from '../../Assets/Images/Ihonalaiset.png'

const LoadingPageWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    background: black;
    height: 100vh;
    width: 100vw;
    display: ${props => props.show ? "block" : "none"};
`

const LoadingPageImage = styled.img`
    height: 100%;
    width: 100%;
    filter: invert(1);
    object-fit: contain;
`

const LoadingPage = (props) => {


    return (
        <LoadingPageWrapper show={props.show}>
            <LoadingPageImage src={Ihonalaiset} />
        </LoadingPageWrapper>
    )
}

export default LoadingPage;