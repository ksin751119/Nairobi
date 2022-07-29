import { textareaLog, stepRun } from './utils/utils';

import { ethers, Signer } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import SafeServiceClient from '@gnosis.pm/safe-service-client';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { SafeTransactionDataPartial } from '@gnosis.pm/safe-core-sdk-types';
import Safe from '@gnosis.pm/safe-core-sdk';

const store = new LocalStorage();

async function stepSendTokenToSender(signer: Signer, cache: any) {
  // Gnosis environment
  const ethAdapter = new EthersAdapter({
    ethers,
    signer: signer,
  });
  const txServiceUrl = 'https://safe-transaction.polygon.gnosis.io/';
  const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });
  const safeAddress = '0xb1E4466cBb1E0a97c81C19Cc8D10C1A1A876e3E2';
  const safeSdk = await Safe.create({ ethAdapter, safeAddress });

  // Setup parameter
  const to = await signer.getAddress();
  const data = '0x';
  const value = '10000';
  const nonce = await safeService.getNextNonce(safeAddress);
  const transaction: SafeTransactionDataPartial = {
    to: to,
    data: data,
    value: value,
    nonce: nonce,
  };
  textareaLog('to: ' + to);
  textareaLog('data: ' + data);
  textareaLog('value: ' + value);
  textareaLog('nonce: ' + nonce);

  // Generate transaction
  const safeTransaction = await safeSdk.createTransaction(transaction);
  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
  const senderSignature = await safeSdk.signTransactionHash(safeTxHash);
  const senderAddress = await signer.getAddress();
  await safeService.proposeTransaction({
    safeAddress,
    safeTransactionData: safeTransaction.data,
    safeTxHash,
    senderAddress,
    senderSignature: senderSignature.data,
  });
  textareaLog('safeTxHash: ' + safeTxHash);

  // check transaction executed
  await isTransactionExecuted(safeService, safeTxHash);
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
