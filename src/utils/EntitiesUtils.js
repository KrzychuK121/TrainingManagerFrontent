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

export function getEntityParamGetter(entity) {
    return (param) => {
        if (!entity || !entity.hasOwnProperty(param))
            return '';
        return entity[param];
    };
}

export function getSelectedIdFrom(listFromParam) {
    if (!listFromParam)
        return null;

    return listFromParam.map(
        entity => entity.id
    );
}

export function toSelectFieldData(toMap, valueProp, descProp) {
    if (!toMap || !valueProp || !descProp)
        return null;
    return toMap.map(
        entity => ({
            value: entity[valueProp],
            description: entity[descProp]
        })
    );
}