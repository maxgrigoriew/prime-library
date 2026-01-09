export function isEmptyObject(object: object) {
    if (object == null)
        return true;

    if (typeof(object) !== 'object')
        throw new TypeError('Parameter #1:object is not an object');

    for (const it in object)
        return false;

    return true;
}

isEmptyObject(null)