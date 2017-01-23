const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

module.exports = router;

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', (req, res, next) => {
//   const addNewPage = (authorId) => {
//     const page = Page.build({
//       AuthorId: authorId,
//       title: req.body.title,
//       content: req.body.content,
//       status: req.body.status
//     });

//     page.save()
//       .then((savedPage) => {res.redirect(savedPage.route)})
//       .catch(next);
//   }

//   User.findOne({
//     where: {email: req.body.email}
//   })
//   .catch(console.error)
//   .then((author) => {
//     if(!author){
//       const newUser = User.build({
//         name: req.body.name,
//         email: req.body.email
//       });
//       newUser.save()
//         .then((savedUser) => {addNewPage(savedUser.id)});


//     } else {
//       addNewPage(author.id);
//     }
//     //if no authors match
//     //add new author - returns promise... then addNewPage
//     //use that author id, to add new page
//     //if author match
//     //use author.id to add new page... then addNewPage
//   })
  User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }
  })
  .then(function ([instance, created]) {

    var user = instance;

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.route);
  })
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
