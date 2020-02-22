export const removeDuplicates = (firstArray, secondArray) => {
    return firstArray.filter(first => secondArray.findIndex(second => second.id === first.id) === -1)
};

export const sortObjectArray = (a, b, field) => {
    const prev = a[field].toLowerCase();
    const next = b[field].toLowerCase();

    if (prev === next) return 0;
    return prev > next ? 1 : -1;
};

export const findParent = (target, ref) => {
    const parent = target.parentNode;

    if (!parent) {
        return false;
    }

    if (parent.className === ref.className) {
        return parent;
    } else {
        findParent(parent, ref)
    }
};
