const News = require('../models/newsModel');

exports.getNewNews = async () => {
  return await News.find({ archiveDate: null }).sort({ date: -1 });
};

exports.getArchivedNews = async () => {
  return await News.find({ archiveDate: { $ne: null } }).sort({ archiveDate: -1 });
};

exports.archiveNews = async (id) => {
  return await News.findByIdAndUpdate(id, { archiveDate: new Date() });
};

exports.deleteNews = async (id) => {
  return await News.findByIdAndDelete(id);
};
v