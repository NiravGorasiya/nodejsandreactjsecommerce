const ObjectId = require("mongoose").Types.ObjectId

exports.isValidObjectedId = (id) => {
    if (id && ObjectId.isValid(id)) {

        return (String)(new ObjectId(id)) === id;
    }
    return false
}