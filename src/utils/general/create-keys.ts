import { writeFile, readFile, stat } from 'fs/promises';
import path from 'path';
import os from 'os';
import { getUserDir } from '../../getters/getter';

async function readIfFile(value: string): Promise<string> {
  try {
    const stats = await stat(value);
    if (stats.isFile()) {
      return await readFile(value, 'utf-8');
    }
  } catch {
    // not a file, treat as raw string
  }
  return value;
}

export async function saveKeys(options: { privateKey?: string; publicKey?: string }) {
  const userDir = getUserDir()

  if (!options.privateKey && !options.publicKey) return;

  // Save private key
  if (options.privateKey) {
    const privPath = path.join(userDir, 'private.key');
    const privContent = await readIfFile(options.privateKey);
    await writeFile(privPath, privContent, { mode: 0o600 });
  }

  // Save public key
  if (options.publicKey) {
    const pubPath = path.join(userDir, 'public.key');
    const pubContent = await readIfFile(options.publicKey);
    await writeFile(pubPath, pubContent, { mode: 0o600 });
  }

  console.log('Keys saved successfully ✅');
}