import { stepRun } from './utils/utils';
import { BigNumber, Signer } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import { sendGnosisSafeRequest } from './utils/utils';
import { GNOSIS_SAFE_TX_SERVICE_POLYGON } from './utils/constants';

const store = new LocalStorage();

async function SendTokenToSender(signer: Signer, cache: any) {
  const safeAddress = '0xb1E4466cBb1E0a97c81C19Cc8D10C1A1A876e3E2';
  const to = await signer.getAddress();
  const value = BigNumber.from('10000');
  const data = '0x';
  const isL1SafeMasterCopy = false;
  const safeTxHash = await sendGnosisSafeRequest(
    signer,
    GNOSIS_SAFE_TX_SERVICE_POLYGON,
    safeAddress,
    to,
    value,
    data,
    isL1SafeMasterCopy
  );
  const ret = { safeTxHash: safeTxHash };
  return ret;
}

export const ScriptSteps = [SendTokenToSender];
export default async function scriptRun(key: string, signer: Signer) {
  // Run steps
  await stepRun(key, store, signer, ScriptSteps);
}
