// import { expect } from 'chai';
import { ethers, Signer, constants} from 'ethers';

// import {USDC_TOKEN, DAI_TOKEN, WMATIC_TOKEN, QUICKSWAP_ROUTER } from './utils/constants';
// import IERC20ABI from '../abi/IERC20.abi.json';
// import QuickswapRouterABI from '../abi/QuickswapRouter.abi.json';

import { LocalStorage, StoreValue } from 'typescript-web-storage';

const store = new LocalStorage();


async function stepA(signer: Signer, cache:StoreValue){
  // console.log(params)
  // const signer:Signer = params.signer;
  console.log(signer);
  console.log('stepA', await signer.getAddress());
  return {"stepAReturn": 1}
}
async function stepB(params:any){
  console.log('stepB');
  return {"stepBReturn": "0xabc"}
}

export default async function scriptRun(key:string, signer: Signer) {
  window.alert("Will execute '"+ key + "'");




  const tasks = [stepA, stepB];
  var cache:any = store.getItem(key)
  if (cache === null) {
    cache = {
      "executedSteps": [],
      "returns":{}
    }
  }

  for (var i=0; i<tasks.length; i++){
    const taskName = tasks[i].name
    if (cache.executedSteps.includes(taskName)){
      continue
    }
    var returnObj:any = await tasks[i](signer, cache)
    for (let key in returnObj) {
      cache.returns[key] = returnObj[key]
    }
    cache.executedSteps.push(tasks[i].name)
    store.setItem(key, cache)
  }
  console.log("cache2", cache)
}
