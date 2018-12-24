const city = require("./city");
const position = require("./position");
const oldindustry = require("./oldindustry");

module.exports = (name) => {
    const modellist = {
        city,
        position,
        oldindustry
    } 
   return modellist[name];
}