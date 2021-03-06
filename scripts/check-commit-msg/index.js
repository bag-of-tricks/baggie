const fs = require("fs");
const log = require("../_helpers/log.helper");

const filePath = process.env.HUSKY_GIT_PARAMS;
const textFromFile = fs.readFileSync(filePath, "utf-8");

const minLength = 10;
const maxLength = 70;

const acceptedStart = {
    Merge: { emoji: "🔀", ignoreMaxLength: true },
    Revert: { emoji: "⏪", ignoreMaxLength: true },
    "feat:": { emoji: "✨" },
    "remove:": { emoji: "🔥" },
    "fix:": { emoji: "🐛" },
    "refactor:": { emoji: "♻" },
    "test:": { emoji: "✅" },
    "docs:": { emoji: "📝" },
    "chore:": { emoji: "👷" },
    "config:": { emoji: "🔧" },
    "deploy:": { emoji: "🚀" },
    "debug:": { emoji: "🩺" },
};

// Remove excessive whitespace and trailing dot
const message = textFromFile.trim().replace(/ +/, " ").replace(/\.$/, "");

const test = new RegExp(
    `^(${Object.keys(acceptedStart)
        .map((key) => key.replace(/^([a-z]+):$/, "$1(?:\\([a-z]+\\))?:"))
        .join("|")})\\s+(.*)`
);
const match = message.match(test);

if (!match) {
    log.error([
        `Commit messages must start with on of the string below:`,
        Object.keys(acceptedStart).join(", ").toLocaleLowerCase(),
        `followed by a space and a description.`,
        ` `,
        `Your message is not valid:`,
        message,
    ]);
} else if (
    message.length > maxLength &&
    !acceptedStart[match[1]].ignoreMaxLength
) {
    log.error([
        `Commit message is too long at ${message.length} characters.`,
        `Keep it at ${maxLength} characters or less. Remove ${
            message.length - maxLength
        } characters.`,
        ` `,
        `Your message is not valid:`,
        message,
    ]);
} else if (match[2].length < minLength) {
    const missingCharacters = minLength - match[2].length;
    log.error([
        `Commit message is too short at ${message.length} characters.`,
        `Add ${missingCharacters} character${
            missingCharacters === 1 ? "" : "s"
        }.`,
        ` `,
        `Your message is not valid:`,
        message,
    ]);
} else {
    const newMessage = `${
        acceptedStart[match[1].replace(/\([a-z]+\)/, "")].emoji
    } ${message.charAt(0).toLowerCase() + message.slice(1)}`;
    fs.writeFileSync(filePath, newMessage);
}
