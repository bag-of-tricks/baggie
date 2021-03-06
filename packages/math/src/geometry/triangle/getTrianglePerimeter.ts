/**
 * Get perimeter of a triangle.
 *
 * @example
 * **Basic usage:**
 * ```ts
 * import { getTrianglePerimeter } from "@baggie/math";
 *
 * const a = 10;
 * const b = 15;
 * const c = 20;
 * const perimeter = getTrianglePerimeter(a, b, c);
 * // perimeter = 45
 * ```
 *
 * @category Geometry - Triangle
 */
export const getTrianglePerimeter = (a: number, b: number, c: number): number =>
    a + b + c;
