/**
 * Module dependencies.
 */

var express = require('express'), routes = require('./routes'), user = require('./routes/user'), http = require('http'), path = require('path'), fs = require('fs');

var app = express();

var db;

var cloudant;

var fileToUpload;

var dbCredentials = {
	dbName : 'my_sample_db'
};

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/public/Demo');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use('/public',express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, '/public/Demo/images')));
app.use('/style', express.static(path.join(__dirname, '/public/Demo/assets/css')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

function initDBConnection() {
	
	if(process.env.VCAP_SERVICES) {
		var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
		if(vcapServices.cloudantNoSQLDB) {
			dbCredentials.host = vcapServices.cloudantNoSQLDB[0].credentials.host;
			dbCredentials.port = vcapServices.cloudantNoSQLDB[0].credentials.port;
			dbCredentials.user = vcapServices.cloudantNoSQLDB[0].credentials.username;
			dbCredentials.password = vcapServices.cloudantNoSQLDB[0].credentials.password;
			dbCredentials.url = vcapServices.cloudantNoSQLDB[0].credentials.url;
		}
		console.log('VCAP Services: '+JSON.stringify(process.env.VCAP_SERVICES));
	}
    else{
            dbCredentials.host = "ffe37731-0505-4683-96a8-87d02a33e03e-bluemix.cloudant.com";
			dbCredentials.port = 443;
			dbCredentials.user = "ffe37731-0505-4683-96a8-87d02a33e03e-bluemix";
			dbCredentials.password = "c7003d0b156d9c4ce856c4e6b4427f3b576c7ea6229235f0369ada1ed47b159c";
			dbCredentials.url = "https://ffe37731-0505-4683-96a8-87d02a33e03e-bluemix:c7003d0b156d9c4ce856c4e6b4427f3b576c7ea6229235f0369ada1ed47b159c@ffe37731-0505-4683-96a8-87d02a33e03e-bluemix.cloudant.com";
        
    }

	cloudant = require('cloudant')(dbCredentials.url);
	
	// check if DB exists if not create
	cloudant.db.create(dbCredentials.dbName, function (err, res) {
		if (err) { console.log('could not create db ', err); }
    });
	db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();

app.get('/', routes.index);

function createResponseData(id, name, value, attachments) {

	var responseData = {
		id : id,
		name : name,
		value : value,
		attachements : []
	};
	
	 
	attachments.forEach (function(item, index) {
		var attachmentData = {
			content_type : item.type,
			key : item.key,
			url : 'http://' + dbCredentials.user + ":" + dbCredentials.password
					+ '@' + dbCredentials.host + '/' + dbCredentials.dbName
					+ "/" + id + '/' + item.key
		};
		responseData.attachements.push(attachmentData);
		
	});
	return responseData;
}


var saveDocument = function(id, name, value, response) {
	
	if(id === undefined) {
		// Generated random id
		id = '';
	}
	
	db.insert({
		name : name,
		value : value
	}, id, function(err, doc) {
		if(err) {
			console.log(err);
			response.sendStatus(500);
		} else
			response.sendStatus(200);
		response.end();
	});
	
}

var saveFeedback=function(id,name,email,speakername,feedback,response){
	
	if(id === undefined) {
		// Generated random id
		id = '';
	}
	
	db.insert({
        speakername : speakername,
		name : name,
		email : email,
		feedback:feedback
	}, id, function(err, doc) {
		if(err) {
			console.log(err);
			response.sendStatus(500);
		} else
	
			//response.sendStatus(200);
			
		response.end();
	});
}

app.post('/api/favorites/attach', multipartMiddleware, function(request, response) {

	console.log("Upload File Invoked..");
	console.log('Request: ' + JSON.stringify(request.headers));
	
	var id;
	
	db.get(request.query.id, function(err, existingdoc) {		
		
		var isExistingDoc = false;
		if (!existingdoc) {
			id = '-1';
		} else {
			id = existingdoc.id;
			isExistingDoc = true;
		}

		var name = request.query.name;
		var value = request.query.value;

		var file = request.files.file;
		var newPath = './public/uploads/' + file.name;		
		
		var insertAttachment = function(file, id, rev, name, value, response) {
			
			fs.readFile(file.path, function(err, data) {
				if (!err) {
				    
					if (file) {
						  
						db.attachment.insert(id, file.name, data, file.type, {rev: rev}, function(err, document) {
							if (!err) {
								console.log('Attachment saved successfully.. ');
	
								db.get(document.id, function(err, doc) {
									console.log('Attachements from server --> ' + JSON.stringify(doc._attachments));
										
									var attachements = [];
									var attachData;
									for(var attachment in doc._attachments) {
										if(attachment == value) {
											attachData = {"key": attachment, "type": file.type};
										} else {
											attachData = {"key": attachment, "type": doc._attachments[attachment]['content_type']};
										}
										attachements.push(attachData);
									}
									var responseData = createResponseData(
											id,
											name,
											value,
											attachements);
									console.log('Response after attachment: \n'+JSON.stringify(responseData));
									response.write(JSON.stringify(responseData));
									response.end();
									return;
								});
							} else {
								console.log(err);
							}
						});
					}
				}
			});
		}

		if (!isExistingDoc) {
			existingdoc = {
				name : name,
				value : value,
				create_date : new Date()
			};
			
			// save doc
			db.insert({
				name : name,
				value : value
			}, '', function(err, doc) {
				if(err) {
					console.log(err);
				} else {
					
					existingdoc = doc;
					console.log("New doc created ..");
					console.log(existingdoc);
					insertAttachment(file, existingdoc.id, existingdoc.rev, name, value, response);
					
				}
			});
			
		} else {
			console.log('Adding attachment to existing doc.');
			console.log(existingdoc);
			insertAttachment(file, existingdoc._id, existingdoc._rev, name, value, response);
		}
		
	});

});

app.post('/api/favorites', function(request, response) {

	console.log("Create Invoked..");
	console.log("Name: " + request.body.name);
	console.log("Value: " + request.body.value);
	
	// var id = request.body.id;
	var name = request.body.name;
	var value = request.body.value;
	
	saveDocument(null, name, value, response);

});

app.post('/',function(req,res){
	
    var speakername=req.body.speakername;
	var name=req.body.name;
	var email=req.body.email;
	var feedback=req.body.feedback;
	
	saveFeedback(null,name,email,speakername,feedback,res);
	backURL=req.header('Referer') || '/';
  // do your thang
  res.redirect(backURL);
});

app.delete('/api/favorites', function(request, response) {

	console.log("Delete Invoked..");
	var id = request.query.id;
	// var rev = request.query.rev; // Rev can be fetched from request. if
	// needed, send the rev from client
	console.log("Removing document of ID: " + id);
	console.log('Request Query: '+JSON.stringify(request.query));
	
	db.get(id, { revs_info: true }, function(err, doc) {
		if (!err) {
			db.destroy(doc._id, doc._rev, function (err, res) {
			     // Handle response
				 if(err) {
					 console.log(err);
					 response.sendStatus(500);
				 } else {
					 response.sendStatus(200);
				 }
			});
		}
	});

});

app.put('/api/favorites', function(request, response) {

	console.log("Update Invoked..");
	
	var id = request.body.id;
	var name = request.body.name;
	var value = request.body.value;
	
	console.log("ID: " + id);
	
	db.get(id, { revs_info: true }, function(err, doc) {
		if (!err) {
			console.log(doc);
			doc.name = name;
			doc.value = value;
			db.insert(doc, doc.id, function(err, doc) {
				if(err) {
					console.log('Error inserting data\n'+err);
					return 500;
				}
				return 200;
			});
		}
	});
});

app.get('/api/favorites', function(request, response) {

	console.log("Get method invoked.. ")
	
	db = cloudant.use(dbCredentials.dbName);
	var docList = [];
	var i = 0;
	db.list(function(err, body) {
		if (!err) {
			var len = body.rows.length;
			console.log('total # of docs -> '+len);
			if(len == 0) {
				// push sample data
				// save doc
				var docName = 'sample_doc';
				var docDesc = 'A sample Document';
				db.insert({
					name : docName,
					value : 'A sample Document'
				}, '', function(err, doc) {
					if(err) {
						console.log(err);
					} else {
						
						console.log('Document : '+JSON.stringify(doc));
						var responseData = createResponseData(
							doc.id,
							docName,
							docDesc,
							[]);
						docList.push(responseData);
						response.write(JSON.stringify(docList));
						console.log(JSON.stringify(docList));
						console.log('ending response...');
						response.end();
					}
				});
			} else {

				body.rows.forEach(function(document) {
					
					db.get(document.id, { revs_info: true }, function(err, doc) {
					if (!err)
						if(doc['_attachments']) {
							
							var attachments = [];
							for(var attribute in doc['_attachments']){
								
								if(doc['_attachments'][attribute] && doc['_attachments'][attribute]['content_type']) {
									attachments.push({"key": attribute, "type": doc['_attachments'][attribute]['content_type']});
								}
							    console.log(attribute+": "+JSON.stringify(doc['_attachments'][attribute]));
							}
							var responseData = createResponseData(
									doc._id,
									doc.name,
									doc.value,
									attachments);
							
						} else {
							var responseData = createResponseData(
									doc._id,
									doc.name,
									doc.value,
									[]);
						}
						
						docList.push(responseData);
						i++;
						if(i >= len) {
							response.write(JSON.stringify(docList));
							console.log('ending response...');
							response.end();
						}
					});
					
				});
			}
			
		} else {
			console.log(err);
		}
	});

});


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
