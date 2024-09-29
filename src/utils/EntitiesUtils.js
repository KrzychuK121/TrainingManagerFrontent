export function createObjFromEntries(toCreate) {
    if (!toCreate)
        throw new Error(`Object can't be null or undefined.`);
    if ('entries' in toCreate && typeof toCreate.entries === 'function')
        return Object.fromEntries(toCreate.entries());
    else
        throw new Error('Object have to contains entries() function.');
}