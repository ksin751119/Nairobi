import { stepRun } from './utils/utils';
import { BigNumber, Signer } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import { sendGnosisSafeRequest } from './utils/utils';
import { GNOSIS_SAFE_TX_SERVICE_ETHEREUM } from './utils/constants';

// Global variable
const store = new LocalStorage();

// Step function
async function SendTokenToSender(signer: Signer, cache: any) {
  // About gnosis safe, you can reference the doc
  // https://docs.gnosis-safe.io/build/sdks/core-sdk
  const safeAddress = '0x64bD0FD02B00E0d2762C415923AB6C2E71C3e13B';
  const to = await signer.getAddress();
  const value = BigNumber.from('100');
  const data = '0x';
  const isL1SafeMasterCopy = true;
  const safeTxHash = await sendGnosisSafeRequest(
    signer,
    GNOSIS_SAFE_TX_SERVICE_ETHEREUM,
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
  // Run steps
  await stepRun(key, store, signer, ScriptSteps);
}
