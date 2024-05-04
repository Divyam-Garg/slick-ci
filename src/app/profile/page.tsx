"use client";
import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import NavBar from "../_components/navbar";
import { useActiveAccount } from "thirdweb/react";
import { ConnectEmbed } from "thirdweb/react";
import { client } from "../client";
import { chain } from "../chain";
import {GateFiSDK, GateFiDisplayModeEnum} from '@gatefi/js-sdk';
import {useReadContract} from 'thirdweb/react'
import {balanceOf} from 'thirdweb/extensions/erc20'
import {getContract} from 'thirdweb'
import {toEther} from 'thirdweb/utils'

// var overlayInstance = new GateFiSDK({
//   merchantId: "testID",
//   displayMode: "overlay" as GateFiDisplayModeEnum,
//   nodeSelector: "#overlay-button"
// })

const Table = () => {
  return (
      <div className="w-full overflow-hidden rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-text-100">
                  <tr>
                      <th scope="col" className="py-3 px-6">Runner</th>
                      <th scope="col" className="py-3 px-6">Minutes</th>
                      <th scope="col" className="py-3 px-6">Unit Price</th>
                      <th scope="col" className="py-3 px-6">Amount</th>
                  </tr>
              </thead>
              <tbody>
                  <tr className="bg-text-100 border-b">
                      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">2 vCPUs</td>
                      <td className="py-4 px-6">97 min</td>
                      <td className="py-4 px-6">US$0.00</td>
                      <td className="py-4 px-6">US$0.39</td>
                  </tr>
                  <tr className="bg-text-100">
                      <td></td>
                      <td></td>
                      <th scope="row" className="py-4 px-6 text-gray-900">Subtotal</th>
                      <td className="py-4 px-6">US$0.39</td>
                  </tr>
                  <tr className="bg-text-100">
                      <td></td>
                      <td></td>
                      <th scope="row" className="py-4 px-6 text-gray-900">Total excluding tax</th>
                      <td className="py-4 px-6">US$0.39</td>
                  </tr>
                  <tr className="bg-text-100">
                      <td></td>
                      <td></td>
                      <th scope="row" className="py-4 px-6 text-gray-900">Total</th>
                      <td className="py-4 px-6">US$0.39</td>
                  </tr>
                  <tr className="bg-text-100">
                      <td></td>
                      <td></td>
                      <th scope="row" className="py-4 px-6 text-gray-900">Applied Balance</th>
                      <td className="py-4 px-6">-US$5.00</td>
                  </tr>
                  <tr className="bg-text-100">
                      <td></td>
                      <td></td>
                      <th scope="row" className="py-4 px-6 text-gray-900">Est. Amount due</th>
                      <td className="py-4 px-6">US$0.00</td>
                  </tr>
              </tbody>
          </table>
      </div>
  );
};

const Profile = () => {
  const account = useActiveAccount();
  // const openOverlay = () => {
  //   overlayInstance.show();
  // };

  const SLICK_CONTRACT = getContract({
    address: '0x165D7c367f70eF96fe4B9b50140Ca456bbECD941',
    chain: chain,
    client: client,
  })

  const {data: slickTokenBalance, isLoading: slickTokenBalanceLoading} = useReadContract(
    balanceOf,
    {
      contract: SLICK_CONTRACT,
      address: account?.address ?? '',
      queryOptions: {
        enabled: !!account,
      },
    }
  )

  const formatBalance = (balance: bigint) => {
    if (!balance) return 'Loading...';
    const tokens = balance / BigInt(1e18) / BigInt(1e18); // Adjust the division based on the token's decimals
    return tokens.toString(); // Return the balance as a string
  }

  function truncate(value: string | number, decimalPlaces: number): number {
    const numbericValue: number = Number(value);
    if (isNaN(numbericValue)) {
      throw new Error('Value is not a number');
    }
    const factor: number = Math.pow(10, decimalPlaces);
    return Math.trunc(numbericValue * factor) / factor;
  }

  console.log("slickTokenBalance:", slickTokenBalance)

  return (
    <div className="min-h-screen bg-bg-100">
      <div className="bg-primary-100">
        <NavBar />
      </div>
      {account ? (
        <div className="container mx-auto py-6">
            {/* <button id="#overlay-button" onClick={openOverlay} className="rounded-md bg-bg-100 p-2 px-4 text-sm text-text-200 hover:bg-bg-200">
            Open Overlay
          </button> */}
         
          <div className="flex items-center justify-between rounded-lg border border-primary-300 bg-primary-100 p-6">
            <div className="flex gap-2">
              <div>
                <IoMdInformationCircleOutline
                  className="mt-0.5 text-text-100"
                  size={24}
                />
              </div>
              <div>
                <h3 className="text-lg text-text-100">
                  Add credits to your account
                </h3>
                <p className="text-sm text-text-200">
                  Pay using our Slick token for better rates or use your credit
                  card to get $SLK
                </p>
              </div>
            </div>
            <div>
              <button className="rounded-md bg-bg-100 p-2 px-4 text-sm text-text-200 hover:bg-bg-200">
                Add funds to your account
              </button>
            </div>
          </div>
          {/* <div className="flex items-center justify-between pt-6"> */}
            {/* <div className="flex gap-2">
              <div>
                <h3 className="text-lg text-text-100">Account Balance</h3>
                <p className="text-sm text-text-200">
                  Your current balance in your account
                </p>
            <h3 className="text-lg text-text-100">
                {
                  slickTokenBalanceLoading ? 'Loading...' : 
                  slickTokenBalance ?
                 formatBalance(slickTokenBalance) : 0
                }
              </h3>
              </div>
            </div> */}
            {/* </div> */}
          <div className="py-6">
            <h4 className="text-xl text-text-100">Resource Limits</h4>
            <p className="text-sm text-text-200">
              Here you can see your account&apos;s limits for AMD64 VCPUs and
              ARM VCPUs.
            </p>
            <div className="flex items-center gap-8 py-6">
              <div className="w-64 rounded-lg border border-primary-300 bg-primary-100 p-4">
                <p className="text-sm text-text-200">
                  Allowed Concurrent AMD64
                </p>
                <h4 className="text-text-100">64 VCPUs</h4>
                <p className="text-xs text-accent-200">Buy more capacity</p>
              </div>
              <div className="w-64 rounded-lg border border-primary-300 bg-primary-100 p-4">
                <p className="text-sm text-text-200">
                  Allowed Concurrent AMD64
                </p>
                <h4 className="text-text-100">64 VCPUs</h4>
                <p className="text-xs text-accent-200">Buy more capacity</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-xl text-text-100">
                  Upcoming Usage Invoice
                </h4>
                <p className="text-sm text-text-200">
                  Billing period: May 4, 2024 - June 4, 2024. Concurrency extensions are not reflected in this table.
                </p>
              </div>
              <div className="rounded-lg border border-primary-300 bg-primary-100 p-4">
                <Table />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[80dvh] items-center justify-center">
          <ConnectEmbed client={client} chain={chain} />
        </div>
      )}
    </div>
  );
};

export default Profile;
