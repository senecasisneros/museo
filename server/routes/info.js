const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const embed = require('embed-video');

let urlLyrics = 'http://search.azlyrics.com/search.php?q=';

router.route('/').post((req, res) => {
  let { songName, artist, url } = req.body;
  axios.get(url)
  .then(res => {
    const html = res.data;
    const $ = cheerio.load(html);

    urlVideo = embed($('.videoInfoList')['3'].children[0].next.children[0].attribs.href);
    let newArtist = artist.replace(/ /g, '+');
    let newSongName = songName.replace(/ /g, '+');

    return axios.get(`${urlLyrics + newArtist}+${newSongName}+&what=all`);
  })
  .catch(err => {
    console.error('errGet1:', err);
    throw err;
  })
  .then(r => {
    const html = r.data;
    const $ = cheerio.load(html);
    lyricsUrl = $('tr')['0'].children[0].children[1].attribs.href || 'undefined';
    if (lyricsUrl === 'undefined') {
      return;
    } else {
    return axios.get(lyricsUrl);
  }
  })
  .catch(err => {
    console.error('errGet2:', err);
    throw err;
  })
  .then(r => {
    if (!r) {
      return;
    }
    const html = r.data;
    const $ = cheerio.load(html);
    const getLyrics = $('.col-lg-8')['0'].children[16].children;
    console.log('getLyrics:', getLyrics);
    const lyrics = getLyrics.map((val, index) => {
      if (index >= 2) {
        if (val.data) {
          return val.data;
        }
        // if (val.name === 'br') {
        //   return val.name;
        // }
      }
      if (!lyricsUrl) {
            return;
          } 
      return null;
    });
    res.send({ songName, artist, urlVideo, lyrics });
  })
  .catch(err => {
    console.error('errGet3:', err);
    throw err;
  });
});

let url = 'https://imvdb.com/api/v1/search/videos?q=';

router.route('/links').post((req, res) => {
  let { songName, artist} = req.body;
  axios.get(encodeURI(url + songName + ' ' + artist))
  // axios.get(encodeURI(`${url + songName} ${artist}`))
  // axios.get(encodeURI(`https://imvdb.com/api/v1/search/videos?q= + ${songName} ${artist}`))
  .then(res => res.data)
  .then(result => {
    const obj = [];
    for (let i = 0; i < 10; i++) {
      obj.push(
        {
          url: result.results[i].url,
          songName: result.results[i].song_title,
          artist: result.results[i].artists[0].name,
        }
      );
    }
    res.send(obj);
  })
  .catch(err => {
    throw err;
  });
});

module.exports = router;
