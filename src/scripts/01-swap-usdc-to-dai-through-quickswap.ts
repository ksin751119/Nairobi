import { expect } from 'chai';
import { ethers, Signer, constants} from 'ethers';

import {USDC_TOKEN, DAI_TOKEN, WMATIC_TOKEN, QUICKSWAP_ROUTER } from './utils/constants';
import IERC20ABI from '../abi/IERC20.abi.json';
import QuickswapRouterABI from '../abi/QuickswapRouter.abi.json';

export default async function scriptRun(signer: Signer) {
  window.alert('01-swap-usdc-to-dai-through-quickswap');

  // Setup external services
  const signerAddress = await signer.getAddress();
  const usdc = new ethers.Contract(USDC_TOKEN, IERC20ABI, signer);
  const dai = new ethers.Contract(DAI_TOKEN, IERC20ABI, signer);
  const router = new ethers.Contract(QUICKSWAP_ROUTER, QuickswapRouterABI, signer);

  // Get token balance
  const signerDAIBalanceBefore = await dai.balanceOf(signerAddress);
  const signerUSDCBalanceBefore = await usdc.balanceOf(signerAddress);

  // approve usdc to quickswap router
  console.log('Approve usdc to quickswap router');
  const amount = ethers.utils.parseUnits('1', 'ether');
  await (await usdc.connect(signer).approve(QUICKSWAP_ROUTER, amount)).wait();

  // swap 1 ether usdc to dai through quickswap
  console.log('swap usdc to dai');
  const path = [usdc.address, WMATIC_TOKEN, DAI_TOKEN];
  await (await router.connect(signer).swapExactTokensForTokens(amount,
    0,
    path,
    await signer.getAddress(),
    constants.MaxUint256)
  ).wait();


  // Verify result
  const signerDAIBalanceAfter = await dai.balanceOf(signerAddress);
  const signerUSDCBalanceAfter = await usdc.balanceOf(signerAddress);
  expect((signerUSDCBalanceBefore.sub(signerUSDCBalanceAfter)).eq(amount)).to.be.eq(true);
  expect(signerDAIBalanceAfter.gt(signerDAIBalanceBefore)).to.be.eq(true);
  console.log('Dai balance:', signerDAIBalanceAfter.toString());
  console.log('USDC balance:', signerUSDCBalanceAfter.toString());

  window.alert('execution has been done.');
}
