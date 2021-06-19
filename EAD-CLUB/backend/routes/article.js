const express = require("express");
const router = express.Router();
const Article = require('../models/articlesSchema')
const Increment = require('../models/article-auto');
const ArticleOne = require('../models/authorSchema')
/* article data handlers*/
/* article get by date */
router.get( '/articles' ,  (req ,res )=> {
    Article.find({ } ,(error,user)=>{
    if( error ){
      console.log("Error in All Article Fetch :  "+error )
    }
    else{
          console.log("Articles Fetched Successfully")
          res.status(200).send( user )
    }
  }).sort( {"time": -1} )
})
/* article get by date ends */
/* article post Data */
function insertArticle( req , res ){
  let seq_val = 0;
  console.log("Insert Called")
  Increment.findOne({name:"pranesh"}).then(result => {
    if( result ) {
      console.log(`Successfully found document: ${result}.`);
      var str = JSON.stringify(result);
      var myarray = str.split(':');
      var seq = myarray[2].split(',');
      console.log('Value is :  ' + seq[0]);
      if( seq[0] )
      {
        Increment.findOneAndUpdate({ name : "pranesh" }, { sequence_value : parseInt(seq[0]) + 1 } )
          .then(updatedDocument => {
            if(updatedDocument) {
              console.log(`Successfully updated document: ${updatedDocument}.`)
              seq_val =  parseInt( seq[0] ) + 1
              console.log("Inside insertUser" +  seq_val + req + res )
              if (seq_val) {
                const user = new Article({
                  aid: seq_val,
                  title: req.body.title,
                  tag : req.body.tag,
                  description : req.body.description,
                  image : req.body.image,
                  quote : req.body.quote,
                  time : Date.now(),
                  auid : req.body.auid
                });

                user.save((error, articleReg) => {
                  if (error) {
                    console.log(error)
                    res.status(401).send(error.error)
                  } else {
                    res.status(200).send("Article Inserted Successfully "+articleReg)
                  }
                })
              }
            } else {
              console.log("No document matches the provided query.")
            }
          })
          .catch(err => console.error(`Failed to find and update document: ${err}`))
      }
    } else {
      console.log("No document matches the provided query.");
    }
  }) .catch(err => console.error(`Failed to find document: ${err}`));
}

router.post("/articlesInsert", (req, res, next) => {
  insertArticle( req , res )
  //res.status(200).send("Success Call")
});
/* article post Data Ends*/

/* Fetch one Article and Author */
router.post( "/articlesOne" , (req, res) => {
  let id = req.body
  //console.log( " id is : " + id + id.aid )
  Article.find({ aid : id.aid },(error,user)=>{
    if( error ){
      console.log("Error in FetchOne Article :  "+error )
    }
    else{
      if( !user ){
        res.status(401).send( "Unable to fetch data")
      }
      else {
        console.log("ArticleOne author Fetched Successfully")
        let auid_ = 1;
        ArticleOne.find({auid : auid_ },(error,auth)=>{
          if( error ){
            console.log("Error in FetchOne Article :  "+error )
          }
          else {
            if( !auth ){
              res.status(401).send( "Unable to fetch author")
            }
            else{
              //console.log( user , auth )
              res.status(200).send( [user,auth] )
            }
          }
        })
      }
    }
  })//.catch( error )=> console.log( error.message())
});
/* Fetch one Article and Author Ends*/

/* article data handlers Ends*/
module.exports = router;
