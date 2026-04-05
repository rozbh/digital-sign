import { mkdir } from 'fs/promises';
import path from 'path';
import os from 'os';
import { getBaseDir, getBuddyDir, getUserDir } from '../../getters/getter';

export async function createFolders() {

    // Define all subfolders relative to baseDir
    const folders = [
        getBaseDir(),
        getUserDir(),
        getBuddyDir()
    ];

    // Create all folders in parallel
    await Promise.all(folders.map(dir => mkdir(dir, { recursive: true, mode: 0o700 })));

    return getBaseDir(); // optionally return the main folder path
}