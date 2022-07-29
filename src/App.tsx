import { ReactElement } from 'react';
import styled from 'styled-components';
// import { Top } from './components/topButton/Top';
import { Hello } from './components/Hello/Hello';
import { Social } from './components/Social/Social';
import { Header } from './components/Header/Header';
import { ActivateDeactivate } from './components/ActivateDeactivate';
import { ActivateDeactivate2 } from './components/ActivateDeactivate2';
import { RunScript } from './components/RunScript';
import { SectionDivider } from './components/SectionDivider';
import { WalletStatus } from './components/WalletStatus';
import { createTheme, WuiProvider } from '@welcome-ui/core'
import { welcomeTheme } from '@welcome-ui/themes'
const theme = createTheme(welcomeTheme)

const StyledAppDiv = styled.div`
  display: grid;
  grid-gap: 20px;
`;



export function App(): ReactElement {
  return (
    <WuiProvider theme={theme}>
    <Social/>
    <StyledAppDiv>
    <Header/>
      <div></div>
      <div></div>
      <div></div>
      <Hello/>
      {/* <SectionDivider /> */}
      <RunScript />
    </StyledAppDiv>
    </WuiProvider>
  );
}
