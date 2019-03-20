import { getInitialUserAccounts } from '../services/storage';

export const isUser = (username, password) => {
    const userAccounts = getInitialUserAccounts();
    return userAccounts.find(acc => acc.username === username && acc.password === password);
}