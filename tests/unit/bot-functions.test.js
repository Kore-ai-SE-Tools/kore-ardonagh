const {
    formatCurrency,
    getCurrentLocaleAndTimezone,
    getEndOfMonthDate,
    varyNumberByPercentage
} = require('../../src/bot-functions')

describe('getEndOfMonthDate()', () => {
    it('should generate the end of the current month date correctly', () => {
        const dt = new Date(2024, 8, 4);
        const result = getEndOfMonthDate(dt);
        const endOfMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
        expect(result.getFullYear()).toBe(endOfMonth.getFullYear());
        expect(result.getMonth()).toBe(endOfMonth.getMonth());
        expect(result.getDay()).toBe(endOfMonth.getDay());
    });
})

describe('getCurrentLocaleAndTimezone', () => {
    it('should return locale and timezone from context when available', () => {
        global.context = {
            session: {
                BotUserSession: {
                    lastMessage: {
                        messagePayload: {
                            meta: {
                                locale: 'fr-FR',
                                timezone: 'Europe/Paris'
                            }
                        }
                    }
                }
            }
        };
        const env = undefined;
        const process = { env: {} };
        const result = getCurrentLocaleAndTimezone();
        expect(result).toEqual({ locale: 'fr-FR', timezone: 'Europe/Paris' });
    });

    it('should return locale and timezone from context when available: en-US/America/Los_Angeles', () => {
        global.context = {
            session: {
                BotUserSession: {
                    lastMessage: {
                        messagePayload: {
                            meta: {
                                locale: 'en-US',
                                timezone: 'America/Los_Angeles'
                            }
                        }
                    }
                }
            }
        };
        const env = undefined;
        const process = { env: {} };
        const result = getCurrentLocaleAndTimezone();
        expect(result).toEqual({ locale: 'en-US', timezone: 'America/Los_Angeles' });
    });
})
