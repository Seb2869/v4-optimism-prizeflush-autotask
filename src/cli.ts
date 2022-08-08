import { handler } from './handler';

type Env = {
  API_KEY: string;
  API_SECRET: string;
  OPTIMISM_MAINNET_PROVIDER_URL: string;
};

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  const {
    API_KEY: apiKey,
    API_SECRET: apiSecret,
    OPTIMISM_MAINNET_PROVIDER_URL: optimismMainnetProviderURL,
  } = process.env as Env;

  handler({
    apiKey,
    apiSecret,
    secrets: { optimismMainnetProviderURL },
  })
    .then(() => process.exit(0))
    .catch((error: Error) => {
      console.error(error);
      process.exit(1);
    });
}
