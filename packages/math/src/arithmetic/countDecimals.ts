/**
 * Count the number of decimals in a number.
 *
 * @example
 * **Basic usage:**
 * ```ts
 * import { countDecimals } from "@baggie/math";
 *
 * const decimalCount = countDecimals(1.0000000001);
 * // decimalCount = 10
 * ```
 *
 * @category Arithmetic
 */
export const countDecimals = (value: number | string): number => {
    const valueIsString = typeof value === "string";
    const text = valueIsString ? (value as string) : value.toString();
    const number = valueIsString
        ? parseInt(value as string, 10)
        : (value as number);

    // verify if number 0.000005 is represented as "5e-6"
    if (text.indexOf("e-") > -1) {
        const split = text.split("e-");
        return parseInt(split[1], 10);
    }

    // count decimals for number in representation like "0.123456"
    if (Math.floor(number) !== value) {
        const split = text.split(".");
        return split.length === 2 ? split[1].length : 0;
    }

    return 0;
};
