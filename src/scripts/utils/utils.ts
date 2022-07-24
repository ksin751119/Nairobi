import { BigNumber, Signer, ethers } from 'ethers';

export function ether(num: any) {
  return ethers.utils.parseUnits(num, 'ether');
}

export function mwei(num: any) {
  return ethers.utils.parseUnits(num, 6);
}

export function getCallData(artifact: any, name: string, params: any) {
  return artifact.interface.encodeFunctionData(name, params);
}

export function getContractCallData(ethValue: any, artifact: any, funcName: string, params: any) {
  return ethers.utils.defaultAbiCoder.encode(['uint256', 'bytes'], [ethValue, getCallData(artifact, funcName, params)]);
}

export function simpleEncodeContractCallData(ethValue: any, func: string, params: any) {
  return ethers.utils.defaultAbiCoder.encode(['uint256', 'bytes'], [ethValue, simpleEncode(func, params)]);
}

export function simpleEncode(_func: string, params: any) {
  const func = 'function ' + _func;
  const abi = [func];
  const iface = new ethers.utils.Interface(abi);
  const data = iface.encodeFunctionData(_func, params);

  return data;
}

export function asciiToHex32(s: string) {
  // Right Pad
  return ethers.utils.formatBytes32String(s);
}

export function getFuncSig(artifact: any, name: string) {
  return artifact.interface.getSighash(name);
}

export async function sendEther(sender: Signer, to: string, value: BigNumber) {
  await sender.sendTransaction({
    to: to,
    value: value,
  });
}

export function mulPercent(num: any, percentage: any) {
  return BigNumber.from(num).mul(BigNumber.from(percentage)).div(BigNumber.from(100));
}

export function padRightZero(s: string, length: any) {
  for (let i = 0; i < length; i++) {
    s = s + '0';
  }
  return s;
}

export function decimal6(amount: any) {
  return BigNumber.from(amount).mul(BigNumber.from('1000000'));
}

export function decimal6To18(amount: any) {
  return amount.mul(ether('1')).div(mwei('1'));
}

export function decimal18To6(amount: any) {
  return amount.mul(mwei('1')).div(ether('1'));
}
