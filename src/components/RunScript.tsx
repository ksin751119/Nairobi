import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import Select from 'react-select';

import styled from 'styled-components';
import GreeterArtifact from '../artifacts/contracts/Greeter.sol/Greeter.json';
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

export function RunScript(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library, active } = context;

  const [signer, setSigner] = useState<Signer>();
  const [greeterContract, setGreeterContract] = useState<Contract>();
  const [greeterContractAddr, setGreeterContractAddr] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [greetingInput, setGreetingInput] = useState<string>('');
  const [scriptInput, setScriptInput] = useState<string>('');


  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  useEffect((): void => {
    if (!greeterContract) {
      return;
    }

    async function getGreeting(greeterContract: Contract): Promise<void> {
      const _greeting = await greeterContract.greet();

      if (_greeting !== greeting) {
        setGreeting(_greeting);
      }
    }

    getGreeting(greeterContract);
  }, [greeterContract, greeting]);

  function handleRunScript(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    // only deploy the Greeter contract one time, when a signer is defined
    if (greeterContract || !signer) {
      return;
    }

    async function deployGreeterContract(signer: Signer): Promise<void> {
      const Greeter = new ethers.ContractFactory(
        GreeterArtifact.abi,
        GreeterArtifact.bytecode,
        signer
      );

      try {
        const greeterContract = await Greeter.deploy('Hello, Hardhat!');

        await greeterContract.deployed();

        const greeting = await greeterContract.greet();

        setGreeterContract(greeterContract);
        setGreeting(greeting);

        window.alert(`Greeter deployed to: ${greeterContract.address}`);

        setGreeterContractAddr(greeterContract.address);
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    deployGreeterContract(signer);
  }

  function handleGreetingChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setGreetingInput(event.target.value);
  }

  function handleGreetingSubmit(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!greeterContract) {
      window.alert('Undefined greeterContract');
      return;
    }

    if (!greetingInput) {
      window.alert('Greeting cannot be empty');
      return;
    }

    async function submitGreeting(greeterContract: Contract): Promise<void> {
      try {
        const setGreetingTxn = await greeterContract.setGreeting(greetingInput);

        await setGreetingTxn.wait();

        const newGreeting = await greeterContract.greet();
        window.alert(`Success!\n\nGreeting is now: ${newGreeting}`);

        if (newGreeting !== greeting) {
          setGreeting(newGreeting);
        }
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    submitGreeting(greeterContract);
  }


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
