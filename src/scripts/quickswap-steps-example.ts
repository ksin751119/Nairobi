import { expect } from 'chai';
import { ethers, Signer, constants } from 'ethers';
import { LocalStorage } from 'typescript-web-storage';
import { USDC_TOKEN, DAI_TOKEN, WMATIC_TOKEN, QUICKSWAP_ROUTER } from './utils/constants';
import { stepRun, textareaLog, sendTx } from './utils/utils';
import IERC20ABI from '../abi/IERC20.abi.json';
import QuickswapRouterABI from '../abi/QuickswapRouter.abi.json';

const store = new LocalStorage();
var usdc: any;
var dai: any;
var router: any;

async function ApproveUSDCToQuickSwapRouter(signer: Signer, cache: any) {
  const amount = ethers.utils.parseUnits('0.1', 6);
  await sendTx(await usdc.connect(signer).approve(router.address, amount));
  textareaLog('allowance: ' + (await usdc.allowance(await signer.getAddress(), router.address)).toString());
  return { amount: amount };
}

async function SwapUSDCToDAIByQuickSwap(signer: Signer, cache: any) {
  const signerAddress = await signer.getAddress();
  const signerDAIBalanceBefore = await dai.balanceOf(signerAddress);
  const signerUSDCBalanceBefore = await usdc.balanceOf(signerAddress);

  // Swap 0.1 usdc to dai through QuickSwap
  const amount = cache.returns.amount;
  const path = [usdc.address, WMATIC_TOKEN, DAI_TOKEN];
  await sendTx(
    await router
      .connect(signer)
      .swapExactTokensForTokens(amount, 0, path, await signer.getAddress(), constants.MaxUint256)
  );

  // Verify result
  const signerDAIBalanceAfter = await dai.balanceOf(signerAddress);
  const signerUSDCBalanceAfter = await usdc.balanceOf(signerAddress);
  textareaLog('DAI balance: ' + signerDAIBalanceAfter.toString());
  textareaLog('USDC balance: ' + signerUSDCBalanceAfter.toString());
  expect(signerUSDCBalanceBefore.sub(signerUSDCBalanceAfter)).to.be.eq(amount);
  expect(signerDAIBalanceAfter).to.be.gt(signerDAIBalanceBefore);

  return {
    signerDAIBalanceAfter: signerDAIBalanceAfter,
    signerUSDCBalanceAfter: signerUSDCBalanceAfter.toString(),
  };
}

export const ScriptSteps = [ApproveUSDCToQuickSwapRouter, SwapUSDCToDAIByQuickSwap];
export default async function scriptRun(key: string, signer: Signer) {
  // Setup global variable
  usdc = new ethers.Contract(USDC_TOKEN, IERC20ABI, signer);
  dai = new ethers.Contract(DAI_TOKEN, IERC20ABI, signer);
  router = new ethers.Contract(QUICKSWAP_ROUTER, QuickswapRouterABI, signer);

  // Run steps
  await stepRun(key, store, signer, ScriptSteps);
}
