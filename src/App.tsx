import { ReactElement } from 'react';
import styled from 'styled-components';
import { ActivateDeactivate } from './components/ActivateDeactivate';
import { ActivateDeactivate2 } from './components/ActivateDeactivate2';
import { RunScript } from './components/RunScript';
import { SectionDivider } from './components/SectionDivider';
import { WalletStatus } from './components/WalletStatus';
import { createTheme, WuiProvider } from '@welcome-ui/core'
import { darkTheme } from '@welcome-ui/themes'
const theme = createTheme(darkTheme)

const StyledAppDiv = styled.div`
  display: grid;
  grid-gap: 20px;
`;

export function App(): ReactElement {
  return (
    <WuiProvider theme={theme}>
    <StyledAppDiv>
      <ActivateDeactivate2 />
      <ActivateDeactivate />
      <SectionDivider />
      <WalletStatus />
      <SectionDivider />
      <RunScript />
    </StyledAppDiv>
    </WuiProvider>
  );
}
