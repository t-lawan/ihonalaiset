import React, { useState, useRef } from "react";
import styled from 'styled-components'
import { Colours, size } from "../Global/Global.styles";

const AboutTextWrapper = styled.div`
  padding: 1rem;
  width: 50%;
  align-self: flex-start;
  position: absolute;
  top: 15%;
  
  @media (max-width: ${size.tablet}) {
    width: 100%;
    top: 5%;
    overflow-y: scroll;
  }
`

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Text = styled.p`
  color: white;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  color: ${Colours.neon_green};
  cursor: ${props => (props.isClickable ? "pointer" : "inherit")};
`;

const AboutText = (props) => {
    const [showCredits, setShowCredits] = useState(false);

    const toggleShowCredits = () => {
        setShowCredits(!showCredits);
      };

    return (
        <AboutTextWrapper>
   
            <Section>
              <Title> {props.title}</Title>
              <Text> {props.text}</Text>
            </Section>

            <Section>
              <Title  onClick={() => toggleShowCredits()} isClickable>
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
                  <Text>
                    {" "}
                    With the support of The Finnish Cultural Foundation, Grafia
                    and The Arts Promotion Centre Finland
                  </Text>
                </>
              ) : null}
            </Section>

        </AboutTextWrapper>
    )
}

export default AboutText;