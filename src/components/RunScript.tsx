import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
  useReducer
} from 'react';
import Select from 'react-select';

import styled from 'styled-components';
import { Provider } from '../utils/provider';
import {SCRIPTS_MAPS} from '../scripts/default'
import {textareaClear} from '../scripts/utils/utils'
import { Textarea } from '@welcome-ui/textarea'




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


export function RunScript(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library } = context;

  const [signer, setSigner] = useState<Signer>();
  const [scriptInput, setScriptInput] = useState<string>('');
  const [scriptText, setScriptText] = useState<string>('');

  // const forceUpdate = useReducer(() => ({}), {})[1] as () => void


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

    // clear textarea log
    textareaClear();
    await (await (SCRIPTS_MAPS.get(scriptInput)))?.default(scriptInput, signer);

  }


  async function handleChange (option: any) {
    setScriptInput(option.value);
    setScriptText(await (await (SCRIPTS_MAPS.get(option.value)))?.default.toString() || '');
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
      <div>
        <div>
        <Textarea name="textarea2" readOnly value={scriptText} />
        </div>
        <div>
        <Textarea id="textarea_log" readOnly></Textarea>
        </div>



      </div>


    </>
  );
}
