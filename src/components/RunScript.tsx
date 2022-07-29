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
import { SectionDivider } from './SectionDivider';
import { Field } from '@welcome-ui/field'




const StyledGreetingDiv = styled.div`
  display: grid;
  // grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 300px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledTableDiv = styled.div`
  // display: grid;
  // grid-template-rows: 1fr 1fr 1fr;
  // grid-template-columns: 300px 2.7fr 1fr;
  grid-gap: 100px;
  place-self: center;
  align-items: center;
`;


const StyledTextareaDiv = styled.div`
  display: flex;
  cols:"30";
  rows:"5";
  grid-gap: 100px;
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
  const [scriptSteps, setScriptSteps] = useState<any[]>([]);

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
    const script:any = await (SCRIPTS_MAPS.get(option.value))

    if (script.ScriptSteps !== undefined){
      setScriptSteps(script.ScriptSteps)
    } else {
      setScriptSteps([])
    }
  }

  function listTable() {
    if (scriptSteps.length > 0){
        return (
          <>
            <Table>
            <Table.Thead>
            <Table.Tr >
              <Table.Th >Step</Table.Th>
              <Table.Th>Cache</Table.Th>
              <Table.Th textAlign="center" w={80}>
                State
              </Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {scriptSteps.map(step => (
              // console.log(step)
              <Table.Tr key={step.name}>
                <Table.Td>{step.name}</Table.Td>
                <Table.Td >
                  <textarea id = {step.name+"_cache"} readOnly cols={50}></textarea>
                </Table.Td>
                <Table.Td textAlign="center">
                  <Button id = {step.name+"_button"} shape="circle" size="sm" variant="primary-info">
                    <SettingsIcon size="sm" />
                </Button>
                </Table.Td>
              </Table.Tr>
            ))}
            </Table.Tbody>
          </Table>
          </>
        );
    }
    return <>
      {/* <div>
        <Textarea name="textarea2" readOnly value={scriptText} style={{
          width: 100,
        }}/>
        </div> */}
    </>;

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
      <SectionDivider/>


      <StyledTableDiv>
      {/* <Table>
        <Table.Thead>
        <Table.Tr >
          <Table.Th >Step</Table.Th>
          <Table.Th>Cache</Table.Th>
          <Table.Th textAlign="center" w={80}>
            State
          </Table.Th>
        </Table.Tr>
        </Table.Thead>
        <Table.Tbody> */}
        {/* {scriptSteps.map(step => (
          // console.log(step)
          <Table.Tr key={step.name}>
            <Table.Td>{step.name}</Table.Td>
            <Table.Td >
              <textarea id = {step.name+"_cache"} readOnly cols={50}></textarea>
            </Table.Td>
            <Table.Td textAlign="center">
              <Button id = {step.name+"_button"} shape="circle" size="sm" variant="primary-info">
                <SettingsIcon size="sm" />
            </Button>
            </Table.Td>
          </Table.Tr>
        ))} */}
        {listTable()}
        {/* </Table.Tbody>
      </Table> */}
      </StyledTableDiv>

      <StyledTextareaDiv>
        {/* <div>
        <Textarea name="textarea2" readOnly value={scriptText} />
        </div> */}
        <Field label="Log from the execution of script">
        <Textarea id="textarea_log" readOnly cols={150}></Textarea>
        </Field>
      </StyledTextareaDiv>


    </>
  );
}
