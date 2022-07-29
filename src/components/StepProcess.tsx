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
import { Table } from '@welcome-ui/table'
import { Button } from '@welcome-ui/button'
import { SettingsIcon } from '@welcome-ui/icons'


const StyledGreetingDiv = styled.div`
  // display: grid;
  // width: 500;
  // grid-template-rows: 1fr 1fr 1fr;
  // grid-template-columns: 300px 2.7fr 1fr;
  place-self: center;
  align-items: center;
`;




export function StepProcess(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library } = context;

  // const [signer, setSigner] = useState<Signer>();
  // const [scriptInput, setScriptInput] = useState<string>('');
  // const [scriptText, setScriptText] = useState<string>('');
  const [scriptSteps, setScriptSteps] = useState<any[]>([]);

  // const forceUpdate = useReducer(() => ({}), {})[1] as () => void



  // function listOptions() {
  //   var options = []
  //   for(let key of Array.from( SCRIPTS_MAPS.keys()) ) {
  //     var option = {
  //       value: key, label: key
  //     }
  //     options.push(option)
  //  }
  //   return options;
  // }


  // async function runSubmit(event: MouseEvent<HTMLButtonElement>){
  //   event.preventDefault();
  //   if (!signer) {
  //     window.alert("not connect wallet yet");
  //     return;
  //   }

  //   // clear textarea log
  //   textareaClear();
  //   await (await (SCRIPTS_MAPS.get(scriptInput)))?.default(scriptInput, signer);

  // }


  // async function handleChange (option: any) {
  //   setScriptInput(option.value);
  //   setScriptText(await (await (SCRIPTS_MAPS.get(option.value)))?.default.toString() || '');
  // }

  const steps = [];
  async function showSteps () {
    for (var i=0; i < scriptSteps.length; i++){

    }
    // scriptSteps
    // setScriptInput(option.value);
    // setScriptText(await (await (SCRIPTS_MAPS.get(option.value)))?.default.toString() || '');
  }

  return (

    <>

    <StyledGreetingDiv>
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Step</Table.Th>
          <Table.Th>Process</Table.Th>
          <Table.Th>Step Number</Table.Th>
          <Table.Th textAlign="center" w={80}>
            Actions
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {scriptSteps.map(step => (
          console.log(step.log())
          // <Table.Tr>
          //   <Table.Td>step.name()</Table.Td>
          //   <Table.Td> ... </Table.Td>
          //   <Table.Td> 0 </Table.Td>
          //   <Table.Td textAlign="center">
          //     <Button shape="circle" size="sm" variant="primary-info">
          //       <SettingsIcon id = {step.name()} size="sm" />
          //   </Button>
          // </Table.Td>
          // </Table.Tr>
        ))}

        <Table.Tr>
          <Table.Td>Consectetur</Table.Td>
          <Table.Td>Lorem ipsum dolor sit amet</Table.Td>
          <Table.Td>23</Table.Td>
          <Table.Td textAlign="center">
            <Button shape="circle" size="sm" variant="primary-success">
              <SettingsIcon size="sm" />
            </Button>
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>Suspendisse</Table.Td>
          <Table.Td>Pellentesque a maximus magna</Table.Td>
          <Table.Td>41</Table.Td>
          <Table.Td textAlign="center">
            <Button shape="circle" size="sm" variant="primary-danger">
              <SettingsIcon size="sm" />
            </Button>
          </Table.Td>
        </Table.Tr>
        <Table.Tr onClick={() => console.log('jungle')}>
          <Table.Td>Ullamcorper</Table.Td>
          <Table.Td>Cras viverra ac erat ullamcorper maximus</Table.Td>
          <Table.Td>8</Table.Td>
          <Table.Td textAlign="center">
            <Button shape="circle" size="sm" variant="primary-info">
              <SettingsIcon size="sm" />
            </Button>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
    </StyledGreetingDiv>

    </>
  );
}
