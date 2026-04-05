import path from "path";
import os from "os";

export function getPrivateKeyPath() {
    return path.join(
        os.homedir(),
        ".ases-ruzi",
        'user',
        "private.key"
    );
}

export function getUserDir() {
    const userDir = path.join(os.homedir(), ".ases-ruzi", "user");
    return userDir
}

export function getBaseDir() {
    const userDir = path.join(os.homedir(), ".ases-ruzi");
    return userDir
}

export function getBuddyDir() {

    const buddyDir = path.join(os.homedir(), ".ases-ruzi", "buddys-keys");

    return buddyDir
}

