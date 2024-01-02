function check_cors(req, res) {
  
}

function disable_cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Allow,Access-Control-Allow-Origin,accept');
}

module.exports = {
  check_cors,
  disable_cors,
}