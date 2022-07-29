import { ReactElement } from 'react';
import styled from 'styled-components';
import { Hello } from './components/Hello/Hello';
import { Header } from './components/Header/Header';
import { RunScript } from './components/RunScript';
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
    <StyledAppDiv>
    <Header/>
      <div></div>
      <div></div>
      <div></div>
      <Hello/>
      <RunScript />
    </StyledAppDiv>
    </WuiProvider>
  );
}
