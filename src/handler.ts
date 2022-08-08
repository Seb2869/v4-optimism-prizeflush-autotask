import { Relayer } from 'defender-relay-client';
import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { prizeFlushFlush } from '@pooltogether/v4-autotask-lib';
import { mainnet } from '@pooltogether/v4-pool-data';

type Event = RelayerParams & {
  secrets: {
    optimismMainnetProviderURL: string;
  };
};

// Entrypoint for the Autotask
export async function handler(event: Event) {
  const relayer = new Relayer(event);

  await prizeFlushFlush(mainnet, {
    chainId: 10,
    providerUrl: event.secrets.optimismMainnetProviderURL,
  })
    .then(async ({ data, to }) => {
      const transactionSentToNetwork = await relayer.sendTransaction({
        data,
        to,
        gasLimit: 500000,
        speed: 'fast',
      });

      console.log(`TransactionHash: ${transactionSentToNetwork.hash}`);
    })
    .catch(async (error) => {
      throw new Error(`PrizeFlush: Unable to create transaction: ${error}`);
    });
}
