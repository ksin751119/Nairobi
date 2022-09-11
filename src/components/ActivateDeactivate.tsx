import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError
} from '@web3-react/injected-connector';
import { MouseEvent, ReactElement, useState, useEffect, } from 'react';
import styled from 'styled-components';
import { injected } from '../utils/connectors';
import { Provider } from '../utils/provider';
import { Button  } from '@welcome-ui/button'
import { AvatarIcon } from '@welcome-ui/icons.avatar'

type ActivateFunction = (
  connector: AbstractConnector,
  onError?: (error: Error) => void,
  throwErrors?: boolean
) => Promise<void>;

function getErrorMessage(error: Error): string {
  let errorMessage: string;

  switch (error.constructor) {
    case NoEthereumProviderError:
      errorMessage = `No Ethereum browser extension detected. Please install MetaMask extension.`;
      break;
    case UnsupportedChainIdError:
      errorMessage = `You're connected to an unsupported network.`;
      break;
    case UserRejectedRequestError:
      errorMessage = `Please authorize this website to access your Ethereum account.`;
      break;
    default:
      errorMessage = error.message;
  }

  return errorMessage;
}

const StyledActivateDeactivateDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;



function Connect(): ReactElement {
  const context = useWeb3React<Provider>();
  const { activate, deactivate, active } = context;
  const [, setActivating] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('');



  useEffect((): void => {
    if (active) {
      setButtonText("Disconnect")
      return;
    }
    setButtonText("Connect");

  }, [active]);


  function handleDeactivate(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    deactivate();
    setButtonText("Connect")

  }

  function handleActivate(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    async function _activate(activate: ActivateFunction): Promise<void> {
      setActivating(true);
      await activate(injected);
      setActivating(false);

      setButtonText("Disconnect")
    }

    _activate(activate);
  }

  function clickButtom(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (active){
      handleDeactivate(event)
    } else {
      handleActivate(event)
    }

  }

  return (
    <Button
      variant={active? "primary-danger": "primary-success"}
      onClick={clickButtom}
    >
      <AvatarIcon size="lg" style={{marginRight:10}}/>
      {buttonText}
    </Button>
  );
}

export function ActivateDeactivate(): ReactElement {
  const context = useWeb3React<Provider>();
  const { error } = context;

  if (!!error) {
    window.alert(getErrorMessage(error));
  }

  return (
    <StyledActivateDeactivateDiv>
      <Connect/>
    </StyledActivateDeactivateDiv>
  );
}
