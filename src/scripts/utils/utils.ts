import { BigNumber, Signer, ethers } from 'ethers';
import { isHexString } from '@ethersproject/bytes';
import { toast } from 'react-toastify';

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

export function resetCache(key: any, store: any, steps: any) {
  // toast('Wow so easy!');
  if (
    window.confirm(
      'Prepare to execute "' + key + '"  script. \nWould you want to reset cache before execute the script'
    )
  ) {
    store.removeItem(key);
    for (var i = 0; i < steps.length; i++) {
      var button = document.getElementById(steps[i].name + '_button') as HTMLButtonElement;
      button.style.background = '#4B9BF1';
    }
  }
}

export async function stepRun(key: any, store: any, signer: Signer, steps: any) {
  resetCache(key, store, steps);

  // Setup cache
  var cache: any = JSON.parse(store.getItem(key) || '{}', parser);
  if (Object.keys(cache).length === 0) {
    cache = {
      stepResult: {},
      returns: {},
    };
  }

  // Execute steps
  for (var i = 0; i < steps.length; i++) {
    const stepName = steps[i].name;
    if (stepName in cache.stepResult) {
      const stepResult = JSON.stringify(cache.stepResult[stepName], replacer, 4);
      const message = stepName + ' has been executed. Do you wan to skip this step?\n' + stepResult;
      if (window.confirm(message)) {
        continue;
      }
    }
    try {
      textareaLog('#####  ' + steps[i].name + '  #####');
      var returnObj: any = await steps[i](signer, cache);
    } catch (e) {
      var button = document.getElementById(steps[i].name + '_button') as HTMLButtonElement;
      button.style.background = '#CE5947';
      window.alert(JSON.stringify(e));
      throw e;
    }
    if (returnObj !== undefined) {
      for (let key in returnObj) {
        cache.returns[key] = returnObj[key];
      }
      cache.stepResult[stepName] = returnObj;
      store.setItem(key, JSON.stringify(cache));

      var td = document.getElementById(steps[i].name + '_cache') as any;
      // td.innerHTML = JSON.stringify(returnObj, replacer, 4);
      td.value = JSON.stringify(returnObj, replacer, 4);
      console.log(JSON.stringify(returnObj, replacer, 4));
    }

    var button = document.getElementById(steps[i].name + '_button') as HTMLButtonElement;
    button.style.background = '#52B45A';
  }

  await downloadFile(key, cache);
}

export async function downloadFile(key: any, data: any) {
  const fileName = key.replace(' ', '_');
  const json = JSON.stringify(data, replacer, 4);
  const blob = new Blob([json], { type: 'application/json' });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName + '.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function textareaLog(...args: any[]) {
  var textarea = document.getElementById('textarea_log') as HTMLInputElement;
  if (!textarea) return;
  args.forEach((arg) => (textarea.value += `${JSON.stringify(arg)}\n`));
}

export async function textareaClear(...args: any[]) {
  var textarea = document.getElementById('textarea_log') as HTMLInputElement;
  textarea.value = '';
}

export async function sendTx(executeTx: any) {
  await toast.promise(executeTx.wait(), {
    pending: 'tx is pending',
    success: 'tx mined 👌',
    error: 'tx fail 🤯',
  });
  return executeTx;
}

function replacer(key: any, value: any) {
  if (isBigNumber(value)) {
    return BigNumber.from(value).toString();
  }
  return value;
}

function parser(key: any, value: any) {
  if (isBigNumber(value)) {
    return BigNumber.from(value);
  }
  return value;
}

function isBigNumber(value: any) {
  if (value.type === 'BigNumber') {
    if (typeof value.hex === 'string') {
      if (isHexString(value.hex) || (value.hex[0] === '-' && isHexString(value.hex.substring(1)))) {
        return true;
      }
    }
  }
  return false;
}
