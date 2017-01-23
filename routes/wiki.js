const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {

  const page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  })

  page.save()
    .then((savedPage) => {res.redirect(savedPage.route)})
    .catch(next);
});

router.get('/add', (req, res, next) => {
res.render('addpage');
});

router.get('/:urlTitle', (req, res, next) => {

  Page.findOne({
    where: { urlTitle: req.params.urlTitle }
  })
  .then((foundPage) => {
    res.render('wikipage', {
      page: foundPage
    })
  })
  .catch(next);
});
