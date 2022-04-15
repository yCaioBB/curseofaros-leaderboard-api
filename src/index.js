const request = require("request");

const BASE_API_URL = "http://curseofaros.com/highscores-";
const LEVEL_TABLE = [0, 46, 99, 159, 229, 309, 401, 507, 628, 768, 928, 1112, 1324, 1567, 1847, 2168, 2537, 2961, 3448, 4008, 4651, 5389, 6237, 7212, 8332, 9618, 11095, 12792, 14742, 16982, 19555, 22510, 25905, 29805, 34285, 39431, 45342, 52132, 59932, 68892, 79184, 91006, 104586, 120186, 138106, 158690, 182335, 209496, 240696, 276536, 317705, 364996, 419319, 481720, 553400, 635738, 730320, 838966, 963768, 1107128, 1271805, 1460969, 1678262, 1927866, 2214586, 2543940, 2922269, 3356855, 3856063, 4429503, 5088212, 5844870, 6714042, 7712459, 8859339, 10176758, 11690075, 13428420, 15425254, 17719014, 20353852, 23380486, 26857176, 30850844, 35438364, 40708040, 46761308, 53714688, 61702024, 70877064, 81416417, 93522954, 107429714, 123404386, 141754466, 162833172, 187046247, 214859767, 246809111, 283509271, 325666684, 374092835, 429719875, 493618564, 567018884, 651333710, 748186012, 859440093, 987237472, 1134038112, 1302667765, 1496372370, 1718880532, 1974475291, 2268076571, 2605335878, 2992745089, 3437761413, 3948950932, 4536153492, 5210672106];
const CATEGORIES = [
    'melee',
    'magic',
    'mining',
    'smithing',
    'woodcutting',
    'crafting',
    'fishing',
    'cooking',
    'tailoring',
    'bg-victories',
    'bg-kills',
];

/**
 * @typedef LeaderboardOptions
 * @property {String!} category
 * @property {Number!} page
 */
/**
 * @typedef LeaderboardPlayer
 * @property {String} name The player's name. Example: "yCaioBB"
 * @property {String|null} name_color The player name's color (A hex color without #). Example: `null` or "10ff00".
 * @property {Number} xp The player's xp (On that category), use `parseLevel(xp)` to compute the player's level. Example: 10000
 */
/**
 * Fetches data from curseofaros.com api.
 * @param {LeaderboardOptions} options The category and/or page to fetch from the leaderboard.
 * @returns {LeaderboardPlayer[20]}
 */
function fetchLeaderboard(options = { category: "melee", page: 1 }) {
    return new Promise(function (resolve, reject) {
        request.get(BASE_API_URL + options.category + ".json?p=" + options.page, function (error, _response, body) {
            if (error) return reject(error);
            else if (body == "Not Found") return reject(body);
            else return resolve(JSON.parse(body));
        });
    });
}

/**
 * Returns the CoA level based on `xp`.
 * @param {String} xp The experience points.
 * @returns {Number}
 */
function parseLevel(xp) {
    for (let index = LEVEL_TABLE.length - 1; index > 0; index--) {
        if (xp >= LEVEL_TABLE[index]) {
            return index + 1;
        }
    }

    return 1;
}

module.exports = {
    fetchLeaderboard,
    parseLevel
};