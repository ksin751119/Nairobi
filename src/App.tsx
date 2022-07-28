import { ReactElement } from 'react';
import styled from 'styled-components';
import { ActivateDeactivate } from './components/ActivateDeactivate';
import { RunScript } from './components/RunScript';
import { StepProcess } from './components/StepProcess';
import { SectionDivider } from './components/SectionDivider';
import { WalletStatus } from './components/WalletStatus';
import { createTheme, WuiProvider } from '@welcome-ui/core'
import { welcomeTheme } from '@welcome-ui/themes'
import { Grid } from '@welcome-ui/grid'
import { Box } from '@welcome-ui/box'
const theme = createTheme(welcomeTheme)

const StyledAppDiv = styled.div`
  display: grid;
  grid-gap: 20px;
`;



export function App(): ReactElement {
  return (
    <WuiProvider theme={theme}>
    <StyledAppDiv>
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <RunScript />
      {/* <StepProcess /> */}
    </StyledAppDiv>
    </WuiProvider>
  );
}
