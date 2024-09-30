export function createObjFromEntries(toCreate, emptiesMapping = null) {
    const requiredFunc = 'keys';
    if (!toCreate)
        throw new Error(`Object can't be null or undefined.`);
    if (!(requiredFunc in toCreate) || typeof toCreate[requiredFunc] !== 'function')
        throw new Error(`Object have to contains ${requiredFunc}() function.`);

    const toReturn = {};

    for (const key of toCreate.keys()) {
        const allValues = toCreate.getAll(key);

        if (allValues.length > 1)
            toReturn[key] = allValues;
        else {
            if (
                (!allValues[0] || !allValues[0].trim()) &&
                emptiesMapping &&
                emptiesMapping.hasOwnProperty(key)
            )
                toReturn[key] = emptiesMapping[key];
            else
                toReturn[key] = allValues[0];
        }

    }

    return toReturn;
}

export function filterObject(toFilter, propsToFilter, remove = true) {
    return Object.keys(toFilter)
        .filter(
            key => remove ?
                !propsToFilter.includes(key)
                : propsToFilter.includes(key)
        )
        .reduce((newObj, key) => {
            newObj[key] = toFilter[key];
            return newObj;
        }, {});
}