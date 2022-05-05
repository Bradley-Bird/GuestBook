import { client, parseData } from './client';

export const getUser = () => client.auth.user;

export async function signUp({ email, password }) {
  const resp = await client.auth.signUp({ email, password });
  return parseData(resp);
}

export async function signIn({ email, password }) {
  const resp = await client.auth.signIn({ email, password });
  return parseData(resp);
}
