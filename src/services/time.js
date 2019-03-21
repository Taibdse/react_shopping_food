export const getTime = (timestamp) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString() + ' ' + d.toLocaleDateString();
}