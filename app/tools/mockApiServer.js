// eslint-disable-next-line import/no-extraneous-dependencies
const jsonServer = require('json-server');

const server = jsonServer.create();

const path = require('path');

const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Can pass a limited number of options to this to override (some) defaults. See https://github.com/typicode/json-server#api
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use((req, res, next) => {
  setTimeout(next, 100);
});

function validateLogin(fields) {
  const errors = {};
  if (!fields.email) errors.email = 'Field required';
  if (!fields.password) errors.password = 'Field required';
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
}

server.post('/login', (req, res) => {
  console.log(req.body);
  const { errors, valid } = validateLogin(req.body);
  if (!valid) {
    res.status(400).send(errors);
  } else {
    res.json({
      token: 'token',
    });
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
