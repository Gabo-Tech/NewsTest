const News = require('../models/newsModel');
const newsService = require('../services/newsService');

exports.getNewNews = async (req, res) => {
  const news = await newsService.getNewNews();
  res.json(news);
};

exports.getArchivedNews = async (req, res) => {
  const archivedNews = await newsService.getArchivedNews();
  res.json(archivedNews);
};

exports.archiveNews = async (req, res) => {
  await newsService.archiveNews(req.params.id);
  res.sendStatus(200);
};

exports.deleteNews = async (req, res) => {
  await newsService.deleteNews(req.params.id);
  res.sendStatus(200);
};
