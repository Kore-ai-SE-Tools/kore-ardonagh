const DEFAULT_LOCALE = "en-US"
const DEFAULT_TIMEZONE = "America/Los_Angeles";
/**
 * Logs messages to the console or the bot log using koreDebugger.log
 * @param message
 */
function log(message) {
    // Check to see if the koreDebugger object exists and is defined if so
    // use the Kore AI platform output facilities
    if (typeof(koreDebugger) !== 'undefined') {
        koreDebugger.log(message);
    } else {
        // Look ma, not running in the Kore AI environment use our old pal console.log(). Yeah!
        console.log(message);
    }
}

/**
 * Generates the date of the current month and formats using the current locale
 * @returns string
 */
function getEndOfMonthDate(dt) {
    // Get current date
    const currentDate = dt ? dt : new Date();

    // Compute end of month
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
}

/**
 * Returns the current values of locale and timezone based on this priority
 *   1. Extracts from the bot context variables
 *   2. Javascript Intl library
 *   3. Extracts locale and timezone from the bot environment variables DEFAULT_LOCALE and DEFAULT_TIMEZONE respectively
 *   4. Uses environment variables DEFAULT_LOCALE and DEFAULT_TIMEZONE for locale and timezone respectively
 * @returns {{timezone, locale}}
 */
function getCurrentLocaleAndTimezone() {
    let locale;
    let timezone;

    // If the context is undefined then we are running under a Node JS environment
    // rather than a bot
    if (typeof(context) !== 'undefined') {
        // Running under the Kore AI environment extract the locale and timezone information respectively!
        locale = context.session.BotUserSession?.lastMessage?.messagePayload?.meta?.locale;
        timezone = context.session.BotUserSession?.lastMessage?.messagePayload?.meta?.timezone;
    } else {
        // Use the Intl object to get the locale and timezone
        // Follow this link for the details on compatability with browsers and node:
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
        locale = Intl.DateTimeFormat().resolvedOptions().locale;
        timezone = Intl.DateTimeFormat().resolvedOptions().timezone;
    }

    // TODO: Refactor to test env only once, but could depend upon if we want
    //       to evaluate locale and timezone independently
    if (!locale) {
        if (typeof(env) !== 'undefined') {
            locale = env?.DEFAULT_LOCALE ? env.DEFAULT_LOCALE : DEFAULT_LOCALE;
        } else {
            locale = process.env?.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE : DEFAULT_LOCALE;
        }
    }
    if (!timezone) {
        if (typeof(env) !== 'undefined') {
            timezone = env?.DEFAULT_TIMEZONE ? env.DEFAULT_TIMEZONE: DEFAULT_TIMEZONE;
        } else {
            timezone = process.env?.DEFAULT_TIMEZONE ? process.env.DEFAULT_TIMEZONE : DEFAULT_TIMEZONE;
        }
    }

    return {
        locale: locale,
        timezone: timezone
    }
}
// Check to see if our environment supports exports
if (typeof(module) !== undefined && module?.exports) {
    log("Exporting bot functions");
    module.exports = {
        getCurrentLocaleAndTimezone,
        getEndOfMonthDate,
        log
    }
}
