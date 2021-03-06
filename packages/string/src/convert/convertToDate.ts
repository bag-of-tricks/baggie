interface DateObject {
    day?: number | string;
    month?: number | string;
    year?: number | string;
}

interface Options {
    zeroBasedMonth?: boolean;
    monthBeforeDay?: boolean;
}

/**
 * Convert a string (or an object) to a date.
 *
 * Returns `false` if given an invalid date.
 *
 * @example
 * **Basic usage:**
 * ```ts
 * import { convertToDate } from "@baggie/string";
 *
 * const stringDate = convertToDate("31-01-2020");
 * // stringDate = Fri Jan 31 2020 00:00:00 GMT+0100 (Central European Standard Time)
 *
 * const objectDate = convertToDate({
 *     day: 31,
 *     month: 1,
 *     year: 2020
 * });
 * // objectDate = Fri Jan 31 2020 00:00:00 GMT+0100 (Central European Standard Time)
 *
 * const invalidDate = convertToDate("99-01-2020");
 * // invalidDate = false
 *
 * const monthBeforeDay = convertToDate("01/31/2020", { monthBeforeDay: true });
 * // invalidDate = Fri Jan 31 2020 00:00:00 GMT+0100 (Central European Standard Time)
 *
 * const zeroBasedMonth = convertToDate("31/00/2020", { zeroBasedMonth: true });
 * // zeroBasedMonth = Fri Jan 31 2020 00:00:00 GMT+0100 (Central European Standard Time)
 * ```
 *
 * @category Convert
 */
export const convertToDate = (
    date: string | DateObject,
    options?: Options
): Date | false => {
    const { zeroBasedMonth = false, monthBeforeDay = false } = { ...options };
    const dateObject: DateObject = {};
    let dateArray: string[] = [];

    if (typeof date === "string") {
        dateArray = date.replace(/^[^0-9]+|[^0-9]+$/g, "").split(/[^0-9]+/);

        if (
            dateArray.length === 1 &&
            (dateArray[0].length === 6 || dateArray[0].length === 8)
        ) {
            dateArray = [
                dateArray[0].substr(0, 2),
                dateArray[0].substr(2, 2),
                dateArray[0].substr(4),
            ];
        } else if (dateArray.length !== 3) {
            throw "Invalid date format";
        }
    }

    dateObject.day = Number(
        (dateArray.length
            ? monthBeforeDay
                ? dateArray[1]
                : dateArray[0]
            : 0) || (date as DateObject).day
    );
    dateObject.month = Number(
        (dateArray.length
            ? monthBeforeDay
                ? dateArray[0]
                : dateArray[1]
            : 0) || (date as DateObject).month
    );
    dateObject.year = Number(dateArray[2] || (date as DateObject).year);

    const trueMonth = dateObject.month - (zeroBasedMonth ? 0 : 1);
    const validDate = new Date();
    validDate.setFullYear(dateObject.year);
    validDate.setMonth(trueMonth);
    validDate.setDate(dateObject.day);
    validDate.setHours(0);
    validDate.setMinutes(0);
    validDate.setSeconds(0);
    validDate.setMilliseconds(0);

    if (
        validDate.getDate() === dateObject.day &&
        validDate.getMonth() === trueMonth &&
        String(validDate.getFullYear()).endsWith(String(dateObject.year))
    ) {
        return validDate;
    } else {
        return false;
    }
};
