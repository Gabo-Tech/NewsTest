const News = require('../models/newsModel');
const fs = require('fs');
const path = require('path');

const loadFallbackData = () => {
  try {
    const dataPath = path.join(__dirname, '../data/data.json');
    const rawData = fs.readFileSync(dataPath);
    const fallbackData = JSON.parse(rawData);
    return fallbackData.news || [];
  } catch (error) {
    console.error('Failed to load fallback data:', error);
    return [];
  }
};

exports.getNewNews = async () => {
  try {
    const newNews = await News.find({ archiveDate: null }).sort({ date: -1 });

    if (newNews.length === 0) {
      console.warn('No news found in MongoDB, using fallback data.');
      return loadFallbackData().filter(news => !news.archiveDate);
    }

    return newNews;
  } catch (error) {
    console.error('Error fetching news from MongoDB:', error);

    return loadFallbackData().filter(news => !news.archiveDate);
  }
};

exports.getArchivedNews = async () => {
  try {
    const archivedNews = await News.find({ archiveDate: { $ne: null } }).sort({ archiveDate: -1 });

    if (archivedNews.length === 0) {
      console.warn('No archived news found in MongoDB, using fallback data.');
      return loadFallbackData().filter(news => news.archiveDate);
    }

    return archivedNews;
  } catch (error) {
    console.error('Error fetching archived news from MongoDB:', error);

    return loadFallbackData().filter(news => news.archiveDate);
  }
};

exports.archiveNews = async (id) => {
  return await News.findByIdAndUpdate(id, { archiveDate: new Date() });
};

exports.deleteNews = async (id) => {
  return await News.findByIdAndDelete(id);
};
