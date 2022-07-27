import { expect } from 'chai';
import { ethers, Signer, constants } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import IERC20ABI from '../abi/IERC20.abi.json';
import QuickswapRouterABI from '../abi/QuickswapRouter.abi.json';
import { USDC_TOKEN, DAI_TOKEN, WMATIC_TOKEN, QUICKSWAP_ROUTER } from './utils/constants';
import { textareaLog, textareaClear, resetCache, stepRun } from './utils/utils';

const store = new LocalStorage();
var usdc: any;
var dai: any;
var router: any;

export default async function scriptRun(key: string, signer: Signer) {
  textareaLog('ssss2');
  textareaLog('ssss2');
  textareaLog('ssss2');

  // textareaClear();
}
