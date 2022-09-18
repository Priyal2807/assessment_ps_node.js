var express = require('express');
var router = express.Router();
var url = require('url')
const ytcm = require("@freetube/yt-comment-scraper")


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/scrape-sentiments', (req, res) => {
    const yurl = req.query.url;
    let q = url.parse(yurl, true);
    const id = q.search;
    const actualId = id.substring(3);
    const payload = {
        videoId: actualId, // Required
        mustSetCookie: false
    }
    ytcm.getComments(payload).then((data) => {
        res.status(201).send({
            "id": actualId,
            "comments": data.total,
            "videoUrl":yurl
        })
    }).catch((error) => {
        res.status(400).send({
            "status": "failure",
            "reason":"wrong url"
        })
    });

})

module.exports = router;
