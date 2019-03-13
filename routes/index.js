var express = require('express');
var router = express.Router();
var longt = 0.00;
var latt =0.00 ;
var jsonData ;
var https = require('https');


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Welcome to Node App' })
 
});







router.post('/ville', function(req, res, next) {
	console.log("rar");
  
	var nomVille = req.body.nom_ville;   
	console.log("dqf" + nomVille);
  
	var urlHttps = 'https://geocode.xyz/' + nomVille + '?json=1&auth=129969521496761168735x1973';
 
	console.log(urlHttps);
	https.get(urlHttps, (resp) => {
	

	
		let data = '';
		resp.on('data', (d) => {
			process.stdout.write(d);
			console.log("je sui dans data");
			data += d;
		});
		
	
		resp.on('end', () => {
			console.log("je sui dans end");
			console.log(data);
			var resultat = JSON.parse(data);
			var msg = 'Ville introuvable';

			if (resultat.matches !== null && nomVille !== '') {
				msg = nomVille;
				longt = resultat.longt;
				latt = resultat.latt;
				console.log(latt);
			}

			res.render('ville', { villeName: nomVille, longValue: longt ,lattValue: latt});
		});

		}).on("error", (err) => {
		console.log("Error: " + err.msg);
		res.render('ville', { 
			msg: 'Oups! Une erreur s\'est produite'
		
		});
	});

});






router.post('/villePost', function(req, res, next) {

	var nomVille = req.body.nom_ville; 
	res.render('ville', { villeName: nomVille});
	console.log("Mon parametre est : " + nomVille);
});

module.exports = router;
