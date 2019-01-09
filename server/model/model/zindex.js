const city = require("./city");
const position = require("./position");
const oldindustry = require("./oldindustry");
const hr = require("./hr");
const company = require("./company");
const workpos = require("./workpos");




module.exports = (name) => {
    const modellist = {
        city,
        position,
        oldindustry,
        workpos,
        company,
        hr
    } 
   return modellist[name];
}