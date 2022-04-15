const api = require("./src/index");

(async function () {
    const randomPlayer = (await api.fetchLeaderboard())[0];

    console.log(api.parseLevel(randomPlayer.xp))
})();