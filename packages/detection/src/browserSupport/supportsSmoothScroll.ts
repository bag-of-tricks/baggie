import { isBrowser } from "..";

/**
 * If the browser supports smooth scroll, this will be `true`.
 *
 * @category Browser Support
 */
export const supportsSmoothScroll =
    isBrowser && "scrollBehavior" in document.documentElement.style;
