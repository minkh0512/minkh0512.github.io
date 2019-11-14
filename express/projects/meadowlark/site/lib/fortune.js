var fortuneCookies = ["기쁘다", "화난다", "슬프다", "즐겁다"];
exports.getFortune = function() {
  var idx = Math.floor(Math.random() * fortuneCookies.length);
  return fortuneCookies[idx];
};
