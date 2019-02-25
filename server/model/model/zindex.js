const city = require("./city");
const position = require("./position");
const oldindustry = require("./oldindustry");
const hr = require("./hr");
const company = require("./company");
const workpos = require("./workpos");
const user =require("./user");
const message =require("./message");
const resume =  require('./resume');
const userWantPos = require('./userWantPos');





module.exports = (name) => {
    const modellist = {
        city,
        position,
        oldindustry,
        workpos,
        company,
        hr,
        user,
        message,
        resume,
        userWantPos
    } 
   return modellist[name];
}