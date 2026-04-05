import { mkdir } from 'fs/promises';
import path from 'path';
import os from 'os';

export async function createFolders() {
    const baseDir = path.join(os.homedir(), '.ases-ruzi');

    // Define all subfolders relative to baseDir
    const folders = [
        baseDir,
        path.join(baseDir, 'user'),
        path.join(baseDir, 'buddys-keys'),
    ];

    // Create all folders in parallel
    await Promise.all(folders.map(dir => mkdir(dir, { recursive: true, mode: 0o700 })));

    return baseDir; // optionally return the main folder path
}