"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/health", (req, res) => {
    res.json({ status: "OK", service: "api-gateway" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map