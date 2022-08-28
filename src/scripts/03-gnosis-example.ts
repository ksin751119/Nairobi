import { textareaLog, stepRun } from './utils/utils';

import { BigNumber, ethers, Signer } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import SafeServiceClient from '@gnosis.pm/safe-service-client';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import Safe from '@gnosis.pm/safe-core-sdk';

import { sendGnosisSafeRequest } from './utils/utils';

const store = new LocalStorage();

async function stepSendTokenToSender(signer: Signer, cache: any) {
  const safeAddress = '0xb1E4466cBb1E0a97c81C19Cc8D10C1A1A876e3E2';
  const to = await signer.getAddress();
  const value = BigNumber.from('10000');
  const data = '0x';
  const safeTxHash = await sendGnosisSafeRequest(signer, 'polygon', safeAddress, to, value, data);
  return { safeTxHash: safeTxHash };
}

export const ScriptSteps = [stepSendTokenToSender];

export default async function scriptRun(key: string, signer: Signer) {
  // Run steps
  await stepRun(key, store, signer, ScriptSteps);
}

async function isTransactionExecuted(safeService: any, safeTxHash: any) {
  textareaLog('wait for gnosis execute the transaction');
  while (true) {
    const tx = await safeService.getTransaction(safeTxHash);
    console.log(tx);
    if (tx.isExecuted) {
      textareaLog(tx);
      window.alert('execution success');

      if (!tx.isSuccessful) {
        window.alert('execution failed');
        break;
      }
      break;
    }
    window.alert('wait for execution');
  }
}
