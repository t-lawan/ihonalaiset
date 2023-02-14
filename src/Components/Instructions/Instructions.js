import * as React from "react";
import styled from "styled-components";
import { Colours, size } from "../Global/Global.styles";
import Device from "../../Utility/Device";

const InstructionWrapper = styled.div`
  position: fixed;
  width: 100%;
  /* height: 100%; */
  bottom: 0;
  z-index: 1100;
  background: transparent;
  display: ${props => (props.show ? "flex" : "none")};
  /* text-align: center; */
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-content: space-between;
  transition: opacity 5s;  
  opacity: 1; // set opacity property to 1, completely visible   
`;

const Instructions = styled.div`
  /* position: sticky; */
  /* top: 75%; */
  text-align: center;
  color: ${Colours.neon_green};
`;

const TextWrapper = styled.div`
  padding: 1rem;
`;

const InstructionText = styled.p`
  margin-bottom: 0.5rem;
  color: ${Colours.neon_green};
  transition: opacity 5s;  
  opacity: 1; 
  @media (max-width: ${size.tabletL}) {
    margin: 0;
    margin-bottom: 0.25rem;
    padding: 0;
    font-size: 0.9rem !important;
  }
`;

class Instruction extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <InstructionWrapper show={this.props.show}>
        <Instructions>
          <TextWrapper>
            {!Device.isMobile() ? (
              <>
                <InstructionText>
                  {" "}
                  Click and Drag to turn the view{" "}
                </InstructionText>
                <InstructionText>
                  {" "}
                  Double click on an object to view
                  animation{" "}
                </InstructionText>
              </>
            ) : (
              <>
                <InstructionText>
                  {" "}
                  Pinch and Spread with two fingers to zoom
                </InstructionText>
                <InstructionText>  Press and drag with one finger to rotate </InstructionText>
                <InstructionText>
                  {" "}
                  Tap on an object to view animation
                </InstructionText>
                <InstructionText>
                  {" "}
                  Recommended to be viewed on desktop
                </InstructionText>
                <InstructionText>
                  {" "}
                  Tap to start
                </InstructionText>
              </>
            )}
          </TextWrapper>
        </Instructions>
      </InstructionWrapper>
    );
  }
}

export default Instruction;
