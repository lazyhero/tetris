module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const TaskSchema = new Schema({
        taskName: {type: String},
        taskDate: {type: Array},
        taskMemberId: {type: String}
    }, {
        versionKey: false
    })

    return mongoose.model('Task', TaskSchema);
}