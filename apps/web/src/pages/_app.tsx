import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@merajut-asa/ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
