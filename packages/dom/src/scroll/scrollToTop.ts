import {
    isBrowser,
    prefersReducedMotion,
    supportsSmoothScroll,
} from "@baggie/detection";
import { smoothScrollFallback } from "./_helpers/smoothScrollFallback.helper";

/**
 * Scroll to the top of the page.
 *
 * @category Scroll
 */
export function scrollToTop(smooth = true): void {
    if (isBrowser) {
        if (smooth) {
            if (supportsSmoothScroll && !prefersReducedMotion) {
                window.scrollTo({ behavior: "smooth", top: 0 });
            } else {
                void smoothScrollFallback(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }
}
