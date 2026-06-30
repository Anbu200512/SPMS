const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const News = require('../models/News');

const getNews = asyncHandler(async (req, res) => {
  const { published } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = {};
  if (published === 'true') filter.isPublished = true;
  if (published === 'false') filter.isPublished = false;

  const news = await News.find(filter).skip(skip).limit(limit).sort('-createdAt');
  const total = await News.countDocuments(filter);

  res.json(
    new ApiResponse(200, {
      news,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  );
});

const getNewsItem = asyncHandler(async (req, res) => {
  const newsItem = await News.findById(req.params.id);
  if (!newsItem) {
    throw new ApiError(404, 'News not found');
  }
  res.json(new ApiResponse(200, { news: newsItem }));
});

const createNews = asyncHandler(async (req, res) => {
  const news = await News.create({
    ...req.body,
    publishedDate: req.body.isPublished ? new Date() : undefined,
  });
  res.status(201).json(new ApiResponse(201, { news }, 'News created successfully'));
});

const updateNews = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };
  if (req.body.isPublished && !req.body.publishedDate) {
    updateData.publishedDate = new Date();
  }

  const news = await News.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!news) {
    throw new ApiError(404, 'News not found');
  }

  res.json(new ApiResponse(200, { news }, 'News updated successfully'));
});

const deleteNews = asyncHandler(async (req, res) => {
  const news = await News.findByIdAndDelete(req.params.id);
  if (!news) {
    throw new ApiError(404, 'News not found');
  }
  res.json(new ApiResponse(200, {}, 'News deleted successfully'));
});

module.exports = { getNews, getNewsItem, createNews, updateNews, deleteNews };
