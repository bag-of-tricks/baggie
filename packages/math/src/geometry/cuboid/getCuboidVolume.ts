/**
 * Get volume of a cuboid.
 *
 * @example
 * **Basic usage:**
 * ```ts
 * import { getCuboidVolume } from "@baggie/math";
 *
 * const x = 10;
 * const y = 20;
 * const z = 30;
 * const surface = getCuboidVolume(x, y, z);
 * // surface = 6000
 * ```
 *
 * @category Geometry - Cuboid
 */
export const getCuboidVolume = (x: number, y: number, z: number): number =>
    x * y * z;
