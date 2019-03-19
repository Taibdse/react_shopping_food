import store from '../redux/store';

export const isUser = (username, password) => {
    let { accounts } = store.getState().userAccount;
    return accounts.find(acc => acc.username === username && acc.password === password);
}