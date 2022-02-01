

export function classNames(...classnames) {
    return classnames.filter((classname) => classname !== null && classname !== false).join(" ");
}