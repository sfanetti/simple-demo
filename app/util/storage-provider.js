import 'cryptojs';

const UNAVAILABLE_SESSION_STORAGE = {};

const COOKIE_LIMIT = 4000;
const STORAGE_LIMIT = 5000000;
const EXPIRE_LIMIT = 1000 * 60 * 60 * 24 * 8;

export const STORAGE_SESSION = 'sessionStorage';
export const STORAGE_LOCAL = 'localStorage';
export const STORAGE_COOKIE = 'cookie';

function getStorageEntity(type) {
    let storageEntity, canUseCookie;
    if (type === STORAGE_SESSION) {
        storageEntity = sessionStorage;
    } else if (type === STORAGE_LOCAL) {
        storageEntity = localStorage;
    } else if (type === STORAGE_COOKIE) {
        //canUseCookie = hasCookies;
    }
    return { storageEntity, canUseCookie };
}

/**
 * simple storage wrapper util
 */
export default class StorageProvider {
    static getStorage(type, storeKey, encryptionKey, cookieExpireMillis = EXPIRE_LIMIT) {
        const { blobconstructor: hasBlob } = window.Modernizr || {};
        const { Rabbit } = window.Crypto || {};

        const { storageEntity, canUseCookie } = getStorageEntity(type);

        function encrypt(value) {
            return Rabbit && value && encryptionKey ? Rabbit.encrypt(value, encryptionKey) : value;
        }
        function decrypt(cipherText) {
            return Rabbit && cipherText && encryptionKey ? Rabbit.decrypt(cipherText, encryptionKey) : cipherText;
        }

        function setCookie(document, name, value, expiresMillis = 0) {
            let date = new Date();
            date.setTime(date.getTime() + expiresMillis);
            const expiresString = `expires=${date.toUTCString()}`;
            const newCookie = `${encodeURI(name)}=${encodeURI(encrypt(value))}; ${expiresString}; path=/`;
            document.cookie = isWithinLimit(newCookie, COOKIE_LIMIT) ? newCookie : document.cookie;
        }

        function getCookie(document, name) {
            const nameKey = `${encodeURI(name)}=`;
            const cookieData = document.cookie;
            const chunks = cookieData.split('; ');
            return chunks.filter(c => c.indexOf(nameKey) === 0).map(c => decodeURI(decrypt(c.split('=')[1])));
        }

        function isWithinLimit(string, limit) {
            return hasBlob ? limit > new Blob([string]).size : true;
        }

        function getStore(storageEntity, storeKey) {
            try {
                return JSON.parse(decrypt(storageEntity.getItem(storeKey)) || '{}');
            } catch (e) {
                try {
                    // if we have a raw kv pair update it to an object
                    return JSON.parse(`{"${storeKey}":"${storageEntity.getItem(storeKey)}"}`);
                } catch (e1) {
                    return UNAVAILABLE_SESSION_STORAGE[storeKey] || {};
                }
            }
        }
        function setStore(storageEntity, storeKey, newStore) {
            try {
                const newStoreString = encrypt(JSON.stringify(newStore));
                storageEntity.setItem(storeKey, isWithinLimit(newStoreString, STORAGE_LIMIT) ? newStoreString : '');
            } catch (e) {
                UNAVAILABLE_SESSION_STORAGE[storeKey] = newStore;
            }
        }
        function getCookieStore(storeKey) {
            try {
                return JSON.parse(getCookie(document, storeKey) || '{}');
            } catch (e) {
                return UNAVAILABLE_SESSION_STORAGE[`cookie-${storeKey}`] || {};
            }
        }

        function setCookieStore(storeKey, newStore, expireMillis) {
            try {
                const newStoreString = JSON.stringify(newStore);
                setCookie(document, storeKey, newStoreString, expireMillis);
            } catch (e) {
                UNAVAILABLE_SESSION_STORAGE[`cookie-${storeKey}`] = newStore;
            }
        }
        let storage = {
            getItem(key) {
                const storeForKey = canUseCookie ? getCookieStore(storeKey) : getStore(storageEntity, storeKey);
                return storeForKey[key];
            },
            setItem(key, value) {
                const storeForKey = canUseCookie ? getCookieStore(storeKey) : getStore(storageEntity, storeKey) || {};
                storeForKey[key] = value;
                canUseCookie
                    ? setCookieStore(storeKey, storeForKey, cookieExpireMillis)
                    : setStore(storageEntity, storeKey, storeForKey);
            },
            removeItem(key) {
                const storeForKey = canUseCookie ? getCookieStore(storeKey) : getStore(storageEntity, storeKey) || {};
                delete storeForKey[key];
                canUseCookie
                    ? setCookieStore(storeKey, storeForKey, cookieExpireMillis)
                    : setStore(storageEntity, storeKey, storeForKey);
            },
            clear() {
                try {
                    if (canUseCookie) {
                        setCookieStore(storeKey, {}, -Date.now());
                    } else {
                        storageEntity.removeItem(storeKey);
                    }
                } catch (e) {
                    // could not remove
                }
            },
            has (field) {
                const storeForKey = canUseCookie ? getCookieStore(storeKey) : getStore(storageEntity, storeKey) || {};
                return Object.keys(storeForKey).includes(field);
            },
            keys() {
                const storeForKey = canUseCookie ? getCookieStore(storeKey) : getStore(storageEntity, storeKey) || {};
                return Object.keys(storeForKey);
            },
            get length() {
                const storeForKey = canUseCookie ? getCookieStore(storeKey) : getStore(storageEntity, storeKey) || {};
                return Object.keys(storeForKey).length;
            }
        };
        Object.freeze(storage);
        return storage;
    }

    static clearStorageByFilter(type, filter) {
        const { storageEntity } = getStorageEntity(type);
        const removed = [];

        if (storageEntity && filter && typeof filter === 'function') {
            for (let i = storageEntity.length - 1; i >= 0; i--) {
                const key = storageEntity.key(i);
                const value = storageEntity.getItem(key);
                if (filter(key, value)) {
                    removed.push({ key, value });
                    storageEntity.removeItem(key);
                }
            }
        }
        return removed;
    }

}
