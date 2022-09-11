# Nairobi

![](images/logoN.png)

Nairobi is a deployment tool that sets up and deploys contracts without exposing private keys. Smart contract deployers can execute deployment easier and safer by writing scripts.

## Features

- Support metamask (mean support hardware wallet)
- Support gnosis-safe
- Provide step flow system to execute the scripts
- Write the script by using Ether.js
- Basically support EVM-Based Chains

## Example ([Demo](https://youtu.be/qDpyWvYqlJY) on Polygon)

- setp example: show the step flow system how to work

  1. approve USDC to Quickswap router
  2. swap USDC to quickswap

- gnosis-safe-example-ethereum : show how to interact with gnosis safe on ethereum
- gnosis-safe-example-polygon : show how to interact with gnosis safe on ethereum

## How to integration your script

1. write your scripts into `scripts/` folder
2. add to `default.ts`
3. execute `yarn start`

![](images/nairobi.png)
