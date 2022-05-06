import { client, parseData } from './client';

export async function getEntries() {
  const request = await client
    .from('entries')
    .select()
    .order('created_at', { ascending: false });
  // request = { data: [/* entries */], error: null }
  return parseData(request);
}

export async function createEntry({ userId, signature }) {
  const request = await client
    .from('entries')
    .insert({ guest_id: userId, content: signature });
  return parseData(request);
}

export async function updateEntryById(id, content) {
  const request = await client
    .from('entries')
    .update({ content })
    .match({ id });
  return parseData(request);
}

export async function deleteEntryById(id) {
  const request = await client.from('entries').delete().match({ id });
  return parseData(request);
}
