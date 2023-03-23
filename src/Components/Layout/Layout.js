import * as React from "react";
import { GlobalStyle } from "../Global/Global.styles";
import styled from 'styled-components'
import Navbar from "../Navbar/Navbar";
import { Helmet, HelmetProvider } from 'react-helmet-async';
export const Main = styled.section`
  /* overflow: hidden; */

`

const Layout = props => {
  let description = "Ihonalaiset is an animated short film that discusses the questions of self-ownership and ecological relationships. The story revolves around a woman, whose everyday life gets interrupted one morning as she notices that something unexpected is growing out of her ear. This leads to a series of events that invites the spectator to contemplate on questions of consent as well as the division of self and other and human and nature. The film is created by Vilja Achté and is based on Kanerva Lehtonen’s short story.";
  let url = "";
  let title = "Ihonalaiset" ;
  return (
    <HelmetProvider>
      {/* <Navbar /> */}
      <Helmet
        htmlAttributes={{
          lang: "en"
        }}
        defaultTitle={title}
        title={title}
        defer={false}
        meta={[
          {
            rel: "canonical",
            href: `${url}`
          },
          {
            name: `description`,
            content: description
          },
          {
            property: `og:title`,
            content: title
          },
          {
            property: `og:description`,
            content: description
          },
          {
            property: `og:type`,
            content: `website`
          },
          {
            property: `og:url`,
            content: `${url}`
          },
          {
            name: `twitter:card`,
            content: `summary`
          },
          {
            name: `twitter:title`,
            content: title
          },
          {
            name: `twitter:description`,
            content: description
          }
        ]}
      >
       <title itemProp="name" lang="en">{title}</title>
       <meta name="description" content={description} />
       <link rel="canonical" href={url} />
       <meta property="og:type" content="website" />
       <meta property="og:description" content={description} />
       <meta property="og:title" content={title} />
       <meta property="og:url" content={url} />
       <meta  name="twitter:title" content={title} />
       <meta  name="twitter:description" content={description} />
      </Helmet>
      <GlobalStyle />
      <Main>{props.children}</Main>
    </HelmetProvider>
  );
};

export default Layout;
