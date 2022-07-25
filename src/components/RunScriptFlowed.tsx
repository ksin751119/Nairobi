import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {FlowManager} from 'flowed';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import Select from 'react-select';

import styled from 'styled-components';
import { Provider } from '../utils/provider';
import {SCRIPTS_MAPS} from '../scripts/default'



const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 300px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export function RunScriptFlowed(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [scriptInput, setScriptInput] = useState<string>('');


  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  function listOptions() {
    var options = []
    for(let key of Array.from( SCRIPTS_MAPS.keys()) ) {
      var option = {
        value: key, label: key
      }
      options.push(option)
   }
    return options;
  }


  async function runSubmit(event: MouseEvent<HTMLButtonElement>){
    event.preventDefault();
    if (!signer) {
      window.alert("not connect wallet yet");
      return;
    }
    await (await (SCRIPTS_MAPS.get(scriptInput)))?.default(signer);
  }

  function handleChange (option: any) {
    console.log(option.value);
    setScriptInput(option.value);
  }

  return (

    <>


      <StyledGreetingDiv>
      <Select
        defaultValue={{label: "Choose the script"}}
        onChange={handleChange}
        options={listOptions()}
      />

      <StyledButton
          style={{
            borderColor: 'unset'
          }}
          onClick={runSubmit}
        >
          Run Script
      </StyledButton>
      </StyledGreetingDiv>

    </>
  );
}
