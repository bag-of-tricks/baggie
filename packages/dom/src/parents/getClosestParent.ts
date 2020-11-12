import { getAllParents } from "./getAllParents";

/**
 * Find the closest parent of an element that matches a selector.
 *
 * @remarks
 * Unless you're supporting **IE11**, you should really use the native method
 * [`Element.closest()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest).
 *
 * @category Parents
 */
export function getClosestParent(
    element: HTMLElement,
    matchSelector = "*"
): Element | null {
    if (typeof element.closest === "function") {
        return element.closest(matchSelector);
    } else {
        const parent = getAllParents(element, { matchSelector, limit: 1 });
        return parent.length ? parent[0] : null;
    }
}