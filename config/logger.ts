const { transports } = require('winston');
export default ({ env }) => ({
    // level: LEVEL_LABEL,
    // levels: LEVELS,
    // format: prettyPrint(),
    transports: [new transports.File({
        filename: '../logs/example.log'
    }), new transports.Console()],
});