/**
 * Get volume of a sphere.
 *
 * @example
 * **Basic usage:**
 * ```ts
 * import { getSphereVolume } from "@baggie/math";
 *
 * const volume = getSphereVolume(10);
 * // volume = 4188.790204786391
 * ```
 *
 * @category Geometry - Sphere
 */
export const getSphereVolume = (radius: number): number =>
    (Math.PI * Math.pow(radius * 2, 3)) / 6;
