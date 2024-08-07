import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const loggedInAtom = atom(Boolean(Cookies.get('token')));
export const isAdminAtom = atom(Cookies.get('role') === 'administrador');
export const customerIDAtom = atom(null); // Defina o customerIDAtom

export const authErrorAtom = atom(null); // Novo átomo para armazenar erros de autenticação




// Defina átomos para cada cor do tema
export const headerBackgroundColorAtom = atom('#ffffff');
export const headerColorAtom = atom('#000000');
export const mainBackgroundColorAtom = atom('#ffffff');
export const mainColorAtom = atom('#000000');
export const footerBackgroundColorAtom = atom('#ffffff');
export const footerColorAtom = atom('#000000');