const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const { shortId } = req.params;

  const currentId = await URL.findOne({
    shortId,
  });

  if (!currentId) {
    res.status(404).send("Short URL not found");
  }

  res.send({
    clicks: currentId.visitHistory.length,
    visitHistory: currentId.visitHistory,
  });
}

async function handleRedirectURL(req, res) {
  //   res.send("Hello");
  const { shortId } = req.params;

  const currentId = await URL.findOne({
    shortId,
  });

  if (!currentId) {
    res.status(404).send("Short URL not found");
  }

  currentId.visitHistory.push({ timestamp: Date.now() }); //!Arrays/Objects are pass by reference

  await currentId.save();

  res.redirect(currentId.redirectURL);
  //continue
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleRedirectURL,
};
