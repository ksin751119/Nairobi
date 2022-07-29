import { expect } from 'chai';
import { ethers, Signer } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import { stepRun, textareaLog } from './utils/utils';

const store = new LocalStorage();

async function stepFailed1(signer: Signer, cache: any) {
  textareaLog('Execute stepFailed1');
  const amount = ethers.utils.parseUnits('1', 6);
  return { amount: amount };
}

async function stepFailed2(signer: Signer, cache: any) {
  const amount = cache.returns.amount;
  textareaLog('amount from previous stepFailed1: ' + amount.toString());

  // error happened
  expect(false).to.be.eq(true);
  return {};
}

export const ScriptSteps = [stepFailed1, stepFailed2];
export default async function scriptRun(key: string, signer: Signer) {
  // Run steps
  await stepRun(key, store, signer, ScriptSteps);
}
