'use strict';

/*
Import
*/
var express = require('express');
var bodyParser = require('body-parser');
var data = require('./data.json');

/*
App Setup
*/
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
Endpoints
*/
app.get("/hi", function(req, res) {
    let name = req.query.name;
    let hero = req.query.hero;
    console.log(name);
    let a = name.split(" ");
    console.log(a[a.length-1]);
    if(a[a.length-1].toLowerCase==="warlock" || a[a.length-1].toLowerCase==="priest" || a[a.length-1].toLowerCase==="mage" || a[a.length-1].toLowerCase==="druid" || a[a.length-1].toLowerCase==="warrior" || a[a.length-1].toLowerCase==="hunter" || a[a.length-1].toLowerCase==="shaman" || a[a.length-1].toLowerCase==="paladin" || a[a.length-1].toLowerCase==="rogue")
    {
    	hero = a[a.length-1];
    	name=""
    	for(let i = 0;i < a.length-1;i++)
    	{
    		name+=a[i];
    	}
    }
    if(name==undefined) {
    	res.send("Check your input. It should be !score cardname class. The class is optional, unless you are searching for a class card.");
    }
    else {
    	console.log(hero);
	    let found = false;
	    let l=0;
	    if(hero!=undefined) {
	    	for(let i = 0; i<data.Cards.length; i++){
		        if(name.toLowerCase() === data.Cards[i].Name.toLowerCase()) {
		        	for(let k = 0; k<data.Cards[i].Scores.length; k++) {
		        		if(data.Cards[i].Scores[k].Hero!=null) {
		        			if(data.Cards[i].Scores[k].Hero.toLowerCase() === hero.toLowerCase()) {
		        				res.send(data.Cards[i].Name+"'s score in "+data.Cards[i].Scores[k].Hero+" is "+data.Cards[i].Scores[k].Score.toString());
		            			found = true;
		        			}
		        		}
		        		else {
		        			l=k;
		        		}
		        	}
		        	if(found==false) {
		        		res.send(data.Cards[i].Name+"'s score in "+hero.substring(0,1).toUpperCase()+hero.substring(1).toLowerCase()+" is "+data.Cards[i].Scores[l].Score.toString());
		        	}
		    	}
		    }
	    }
	    else {
			for(let i = 0; i<data.Cards.length; i++){
		        if(name.toLowerCase() === data.Cards[i].Name.toLowerCase()) {
		        	if(data.Cards[i].Scores[0].Hero===null) {
			    		res.send(data.Cards[i].Name+"'s score in the neutral class is "+data.Cards[i].Scores[0].Score.toString());
			    		found = true;
					}
					else {
						found = false;
					}
				}
			}
		}
	    if(!found)
	    {
	        res.send("Check your input. It should be !score cardname class. The class is optional, unless you are searching for a class card.");
	    }
    }
    
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port ' + port);