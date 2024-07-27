import { atom } from 'jotai';
import Cookies from 'js-cookie';

export const loggedInAtom = atom(Boolean(Cookies.get('token')));
export const isAdminAtom = atom(Cookies.get('role') === 'administrador');
export const authErrorAtom = atom(null); // Novo átomo para armazenar erros de autenticação
