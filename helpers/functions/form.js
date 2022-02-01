

export function isNumeric(v) {
    return !isNaN(v)
}


export function deepSet(object, path, newValue) {
    var stack = path.split(".");
    var key
    while (stack.length > 1) {
        key = stack.shift()
        object = object[key]

    }

    key = stack.shift()

    object[key] = newValue;
}


export function deepGet(obj, path) {
    path = path.replace(/\[(\w+)\]/g, ".$1");
    path = path.replace(/^\./, "");
    var a = path.split(".");
    var o = obj;
    while (a.length) {
        var n = a.shift();
        if (!(n in o)) return;
        o = o[n];
    }
    return o;
}