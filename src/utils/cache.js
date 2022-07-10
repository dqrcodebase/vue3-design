import Cookies from 'js-cookie';

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, value, options) {
  return Cookies.set(key, value, options);
}

export function removeCookie(key) {
  return Cookies.remove(key);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key, value) {
  return localStorage.setItem(key, value);
}

export function removeLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function getSessionStorage(key) {
  return localStorage.getItem(key);
}

export function setSessionStorage(key, value) {
  return sessionStorage.setItem(key, value);
}

export function removeSessionStorage(key) {
  return sessionStorage.removeItem(key);
}
