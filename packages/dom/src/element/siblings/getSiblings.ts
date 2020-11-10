export const getSiblings = (
    element: Element,
    includeOriginalElement = false,
    fromElement?: Element,
    untilElement?: Element
): Element[] => {
    const parent = element.parentNode;

    if (!parent) {
        throw "Element not in DOM";
    }

    if (includeOriginalElement && !fromElement && !untilElement) {
        // Return array including the original element and all its siblings
        return Array.from(parent.children);
    }

    const siblings = [];

    // Start looking for siblings starting with this element
    let nextElement = fromElement || parent.firstElementChild;

    do {
        if (nextElement) {
            const currentElement = nextElement;
            const sameAsOriginalElement = element === currentElement;

            // Set next element to look at
            nextElement = nextElement.nextElementSibling;

            // Add this element to the list of sibling
            // unless it is the same as the original element (and this should be left out)
            if (!sameAsOriginalElement || includeOriginalElement) {
                siblings.push(currentElement);
            }

            // Stop looking for siblings, if the loop is set to stop at the current element
            if (currentElement === untilElement) {
                break;
            }
        }
    } while (nextElement);

    // Return array of elements
    return siblings;
};