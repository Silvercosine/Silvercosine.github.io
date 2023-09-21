function validate(data,rules) {
    const messages = [];

    for(const key in rules) {
        if(!data.hasOwnProperty(key)) {
            messages.push({
                key,
                error: "key doesnt exist",
            });
        }   else if(data.hasOwnProperty(key) && !rules[key](data[key])) {
            messages.push({
                key,
                error: "value doesnt satisfy the given rule",
            });
        }
    }
    return messages;
}
module.exports = { validate };