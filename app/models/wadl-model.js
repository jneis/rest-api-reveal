var mongoose = require('mongoose');

var wadlSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true
	},
	url: String,
	authentication: {
		required: Boolean,
		strategy: {
			type: String,
			enum: ["none", "userpass", "key"]
		},
		username: String,
		password: String
	},	
	date: {
		type: Date,
		default: Date.now
	}
});

wadlSchema.statics.updateByName = function(wadl, callback) {
	this.findOneAndUpdate({name: wadl.name}, wadl, {upsert: true}, callback);
};

wadlSchema.statics.findByName = function(name, callback) {
	this.findOne({name: name}, callback);
};

wadlSchema.statics.removeByName = function(name, callback) {
	this.findOneAndRemove({name: name}, callback);
}

var Wadl = mongoose.model('Wadl', wadlSchema);