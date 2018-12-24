// 对于model,默认实现封装promise的方法，各个model实例化需要继承（extends）此类，在用有基本类之后，对于所需的其他方法在继承类中实现
const getModelbyName = require("./model/zindex")
class anyModel {
    constructor(name) {
        this.name = name;
        this.model = getModelbyName(name);
    }
    getModel() {
        const schema = require(`./${this.name}`);
        var oldindustryModel = mongoose.model("oldinsustry", schema);
        return oldindustryModel;
    }
    find(option) {
        return new Promise((resolve, reject) => {
            this.model.find(option, (error, doc) => {
                if (error) {
                    reject(error);
                }
                resolve(doc);
            });
        });
    }
    insertMany(array) {
        return new Promise((resolve, reject) => {
            this.model.insertMany(array, (error, doc) => {
                if (error) {
                    reject(error);
                }
                resolve(doc);
            });
        });
    }
}

module.exports = anyModel;