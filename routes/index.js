const express = require('express');

const speakersRoute = require('./speakers');

const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (req, res, next) => {
    try {
      // if (!req.session.visitcount) {
      //   req.session.visitcount += 0;
      // }
      // req.session.visitcount += 1;
      // console.log(`Number of visits: ${req.session.visitcount}`);

      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      // res.sendFile(path.join(__dirname, './static/index.html'));
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));
  return router;
};
