var mongoose = require("mongoose");

var resumeSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    resumeName: {
        type: String
    },
    uploadTime: {
        type: Date,
        default: Date
    },
    resumeSize: {
        type: String
    },
    resumeType: {
        type: Number,
        default: 1 //1:pdf,2:doc,3:docx
    },
    path: {
        type: String
    }
});

var resumeModel = mongoose.model("resume", resumeSchema);
//将这个模型暴露出去
module.exports = resumeModel;