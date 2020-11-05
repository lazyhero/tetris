module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const MemberSchema = new Schema({
        name: {type: String},
    }, {
        versionKey: false
    })

    return mongoose.model('Member', MemberSchema);
}