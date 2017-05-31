const express = require('express');
const app = express();
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});