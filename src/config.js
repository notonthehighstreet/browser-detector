module.exports.bvdefault = {i: 9, f: 40, o: 20, s: 8, n: 12, c: 34, m: 4};

module.exports.names = {
    i: 'Internet Explorer',
    e: "Edge",
    f: 'Firefox',
    o: 'Opera',
    s: 'Safari',
    n: 'Netscape',
    c: "Chrome",
    m: "Maxthon",
    x: "Other"
};

module.exports.pattern = [["Trident.*rv:VV", "i"], ["Trident.VV", "io"], ["MSIE.VV", "i"],
    ["Edge.VV", "e"], ["OPR.VV", "o"], ["Maxthon.VV", "m"], ["Chrome.VV", "c"],
    ["Firefox.VV", "f"], ["Version.VV.{0,10}Safari", "s"], ["Safari.VV", "so"],
    ["Opera.*Version.VV", "o"], ["Opera.VV", "o"]];