var isochrone = require('osrm-isochrone');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var resolution = 25; // sample resolution
var network = './almere.osrm' // prebuilt almere osrm network file


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.set('port', (process.env.PORT || 5000));

app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/data', express.static(__dirname + '/data'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});



// http://localhost:5000/api/v1/isochrone?lat=5.2232&lon=52.3743&drivetime=100
app.get('/api/v1/isochrone', function(req, res) {
	if(req.query.lat && req.query.lon && req.query.drivetime) {
		
		var location = [req.query.lat, req.query.lon];
		var drivetime = req.query.drivetime;

		isochrone(location, drivetime, resolution, network, function(err, drivetime) {
		  if(err) throw err;
		  // a geojson linestring
		  res.json(drivetime);
		});		
	} else {
		res.json({'error':'Specify lat, lon and drivetime GET parameters'});
	}
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});










