import React from 'react';

declare global {
    interface Window {
        CryptoJS: any;
    }
}

// --- CORE CRYPTOGRAPHIC FUNCTIONS ---

export const sha512 = (message: string): string => {
    if (!window.CryptoJS) return '';
    return window.CryptoJS.SHA512(message).toString();
};

export const hmacSha512 = (key: string, message: string): string => {
    if (!window.CryptoJS) return '';
    return window.CryptoJS.HmacSHA512(message, key).toString();
};

export const generateServerSeed = (): string => {
    if (!window.CryptoJS) return 'crypto-js-not-loaded';
    return window.CryptoJS.lib.WordArray.random(32).toString();
};


// --- PROVABLY FAIR GAME LOGIC ---

/**
 * Generates a float between [0, 1) from the given seeds.
 * @param serverSeed The unhashed server seed.
 * @param clientSeed The client seed.
 * @param nonce The game nonce.
 * @param cursor The cursor for multi-result games.
 * @returns A float between 0 and 1.
 */
export const generateFloat = (serverSeed: string, clientSeed: string, nonce: number, cursor: number): number => {
    const hash = hmacSha512(serverSeed, `${clientSeed}:${nonce}:${cursor}`);
    const hexSegment = hash.substring(0, 14); // 56 bits for high precision
    const bytes = parseInt(hexSegment, 16);
    return bytes / Math.pow(2, 56);
};

/**
 * Generates a uniformly distributed integer up to maxExclusive.
 * @param serverSeed - The unhashed server seed.
 * @param clientSeed - The client seed.
 * @param nonce - The game nonce.
 * @param cursor - The starting cursor position.
 * @param maxExclusive - The exclusive maximum value for the integer.
 * @returns An object containing the generated value and the next cursor position.
 */
export const generateInteger = (serverSeed: string, clientSeed: string, nonce: number, cursor: number, maxExclusive: number): { value: number; nextCursor: number } => {
    const float = generateFloat(serverSeed, clientSeed, nonce, cursor);
    return {
        value: Math.floor(float * maxExclusive),
        nextCursor: cursor + 1,
    };
};


// --- GAME-SPECIFIC IMPLEMENTATIONS ---

/**
 * Generates mine positions for the Mines game using a Fisher-Yates shuffle simulation.
 * @param serverSeed The unhashed server seed.
 * @param clientSeed The client seed.
 * @param nonce The game nonce.
 * @param minesCount The number of mines to place.
 * @returns An array of mine indices (0-24).
 */
export const generateMines = (serverSeed: string, clientSeed: string, nonce: number, minesCount: number): number[] => {
    const boardSize = 25;
    const mineIndices: number[] = [];
    let currentCursor = 0;
    const availableTiles = Array.from({ length: boardSize }, (_, i) => i);

    for (let i = 0; i < minesCount; i++) {
        const result = generateInteger(serverSeed, clientSeed, nonce, currentCursor, availableTiles.length);
        currentCursor = result.nextCursor;
        const pickIndex = result.value;

        mineIndices.push(availableTiles[pickIndex]);
        availableTiles.splice(pickIndex, 1);
    }
    
    return mineIndices.sort((a, b) => a - b);
};


/**
 * Generates a deterministic path for a Plinko ball drop.
 * @param serverSeed The unhashed server seed.
 * @param clientSeed The client seed.
 * @param nonce The game nonce.
 * @param rows The number of rows on the Plinko board.
 * @returns The final bucket index.
 */
export const generatePlinkoPath = (serverSeed: string, clientSeed: string, nonce: number, rows: number): number => {
    const result = generateInteger(serverSeed, clientSeed, nonce, 0, Math.pow(2, rows));
    const directionsInt = result.value;

    let bucket = 0; // Starts at the leftmost position
    let temp = directionsInt;

    for (let i = 0; i < rows; i++) {
        bucket += temp & 1; // Add 1 for a right move (bit is 1), 0 for a left move (bit is 0).
        temp >>= 1;
    }
    
    return bucket;
};