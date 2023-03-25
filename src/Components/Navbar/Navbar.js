import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colours } from "../Global/Global.styles";

const NavbarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: transparent;
`;

const NavbarLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`;

const NavbarLink = styled.p`
  text-decoration: none;
  color: ${Colours.neon_green};
  cursor: pointer;
`;

const Navbar = (props) => {
  return (
    <NavbarWrapper>
      <NavbarLinksWrapper>
        <NavbarLink  onClick={() => props.openInfoModal()}> INFO </NavbarLink>
        {/* <NavbarLink onClick={() => props.toggleMusic()}> {props.isPlaying ? 'Ø' : 'O'} </NavbarLink> */}
      </NavbarLinksWrapper>
    </NavbarWrapper>
  );
};

export default Navbar;
