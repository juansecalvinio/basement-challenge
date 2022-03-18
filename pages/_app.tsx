import {ChakraProvider, Container} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import Head from "next/head";

import "../css/global.css";
import theme from "../theme";

function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Basement Supply</title>
        <meta content="Coding challenge for basement.studio." name="description" />
      </Head>
      <ChakraProvider theme={theme}>
        <Container maxWidth="container.xl">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </>
  );
}
export default App;
