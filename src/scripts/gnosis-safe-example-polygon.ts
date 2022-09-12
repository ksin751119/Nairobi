import { stepRun } from './utils/utils';
import { BigNumber, Signer } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import { sendGnosisSafeRequest } from './utils/utils';
import { GNOSIS_SAFE_TX_SERVICE_POLYGON } from './utils/constants';

// Global variable
const store = new LocalStorage();

// Step function
async function SendTokenToSender(signer: Signer, cache: any) {
  // About gnosis safe, you can reference the doc
  // https://docs.gnosis-safe.io/build/sdks/core-sdk

  const safeAddress = '0xb1E4466cBb1E0a97c81C19Cc8D10C1A1A876e3E2';
  const to = await signer.getAddress();
  const value = BigNumber.from('10000');
  const data = '0x'; // No data means sending native token
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

  return { safeTxHash: safeTxHash };
}

// Setup script steps
export const ScriptSteps = [SendTokenToSender];
export default async function scriptRun(key: string, signer: Signer) {
  await stepRun(key, store, signer, ScriptSteps);
}
