const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Gallery = require('../models/Gallery');

const getGallery = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;

  const items = await Gallery.find(filter).sort('-createdAt');
  res.json(new ApiResponse(200, { items }));
});

const getGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Gallery item not found');
  }
  res.json(new ApiResponse(200, { item }));
});

const createGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json(new ApiResponse(201, { item }, 'Gallery item created successfully'));
});

const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!item) {
    throw new ApiError(404, 'Gallery item not found');
  }

  res.json(new ApiResponse(200, { item }, 'Gallery item updated successfully'));
});

const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findByIdAndDelete(req.params.id);
  if (!item) {
    throw new ApiError(404, 'Gallery item not found');
  }
  res.json(new ApiResponse(200, {}, 'Gallery item deleted successfully'));
});

module.exports = { getGallery, getGalleryItem, createGalleryItem, updateGalleryItem, deleteGalleryItem };
