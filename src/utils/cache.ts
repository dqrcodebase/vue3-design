import Cookies from 'js-cookie';

export function getCookie(key:any) {
  return Cookies.get(key);
}

export function setCookie(key:any, value:any, options:any) {
  return Cookies.set(key, value, options);
}

export function removeCookie(key:any) {
  return Cookies.remove(key);
}

export function getLocalStorage(key:any) {
  return localStorage.getItem(key);
}

export function setLocalStorage(key:any, value:any) {
  return localStorage.setItem(key, value);
}

export function removeLocalStorage(key:any) {
  return localStorage.removeItem(key);
}

export function getSessionStorage(key:any) {
  return localStorage.getItem(key);
}

export function setSessionStorage(key:any, value:any) {
  return sessionStorage.setItem(key, value);
}

export function removeSessionStorage(key:any) {
  return sessionStorage.removeItem(key);
}
