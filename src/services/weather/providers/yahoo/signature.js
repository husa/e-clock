// @flow

import CryptoJS from 'crypto-js';

type Config = { BASE_URL: string, CONSUMER_KEY: string, CONSUMER_SECRET: string };

export const getSignedAuthHeader = <Query>(
  query: Query,
  { BASE_URL, CONSUMER_KEY, CONSUMER_SECRET }: Config,
): string => {
  const oauth = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: Math.random()
      .toString(36)
      .substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
    oauth_version: '1.0',
  };

  const params = { ...query, ...oauth };

  // Note the sorting here is required
  const paramsAsUri = Object.keys(params)
    .sort()
    .map(key => `${key}=${encodeURIComponent(params[key])}`);

  const signatureBase = `GET&${encodeURIComponent(BASE_URL)}&${encodeURIComponent(
    paramsAsUri.join('&'),
  )}`;

  const compositeKey = encodeURIComponent(CONSUMER_SECRET) + '&';
  const hash = CryptoJS.HmacSHA1(signatureBase, compositeKey);
  const signature = hash.toString(CryptoJS.enc.Base64);

  // $FlowFixMe
  oauth['oauth_signature'] = signature;

  return (
    'OAuth ' +
    Object.keys(oauth)
      .map(key => `${key}="${oauth[key]}"`)
      .join(',')
  );
};
