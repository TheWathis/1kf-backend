class DefaultController {
  getIndex(req, res) {
    res.send('Yup, that\'s the default controller.');
  }
}

module.exports = new DefaultController();