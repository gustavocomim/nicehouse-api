module.exports = {
  routes: [
    {
      "method": "GET",
      "path": "/download",
      "handler": "csv.download",
      "config": {
        "policies": []
      }
    }
  ],
};