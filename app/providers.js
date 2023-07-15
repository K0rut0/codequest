"use client"; // ---> this line does the trick

import { ChakraProvider } from "@chakra-ui/react";

const Providers = ({ children }) => {
  return <ChakraProvider resetCSS>{children}</ChakraProvider>;
};

export default Providers;
