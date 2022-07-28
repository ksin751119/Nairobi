// import { scriptRun } from './01-swap-usdc-to-dai-through-quickswap';
// import { ScriptSteps } from './02-step-poc';

// Add Scripts Here
export const SCRIPTS_MAPS = new Map([
  ['01 - swap USDC to dai through Quickswap', import('./01-swap-usdc-to-dai-through-quickswap')],
  ['02 - step-poc', import('./02-step-poc')],
  ['04 - log-poc', import('./04-log-poc')],
]);

// export const SCRIPTS_STEP_MAPS = new Map([
//   // ['01 - swap USDC to dai through Quickswap', steps02],
//   ['02 - step-poc', ScriptSteps],
//   // ['02 - step-poc', import('./02-step-poc')],
//   // ['04 - log-poc', import('./04-log-poc')],
// ]);
