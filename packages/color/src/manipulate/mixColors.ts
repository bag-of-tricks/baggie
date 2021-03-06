import { RGBA } from "../_interfaces/rgba.interface";

/**
 * Mix two colors together.
 *
 * This works pretty much like the `mix()` function in SASS.
 *
 * @example
 * **Basic usage:**
 * ```ts
 * import { mixColors } from "@baggie/color";
 *
 * const colorA = { red: 255, green: 255, blue: 255 };
 * const colorB = { red: 95, green: 98, blue: 98 };
 *
 * const newColor = mixColors(colorA, colorB, .91);
 * // newColor = { red: 241, green: 241, blue: 241, alpha: 1 }
 * ```
 *
 * @category Manipulate
 */
export const mixColors = (color1: RGBA, color2: RGBA, weight = 0.5): RGBA => {
    const red1 = color1.red / 255;
    const red2 = color2.red / 255;
    const green1 = color1.green / 255;
    const green2 = color2.green / 255;
    const blue1 = color1.blue / 255;
    const blue2 = color2.blue / 255;
    const alpha1 = color1.alpha || 1;
    const alpha2 = color2.alpha || 1;

    // If weight is more than 1, let's assume it's defined as percentages instead of decimals and convert it to decimals
    const mixWeight = weight > 1 ? Math.min(weight, 100) / 100 : weight;

    return {
        red: Math.round((red2 + (red1 - red2) * mixWeight) * 255),
        green: Math.round((green2 + (green1 - green2) * mixWeight) * 255),
        blue: Math.round((blue2 + (blue1 - blue2) * mixWeight) * 255),
        alpha:
            Math.round((alpha2 + (alpha1 - alpha2) * mixWeight) * 1000) / 1000,
    };
};
