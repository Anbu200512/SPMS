const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const Settings = require('../models/Settings');

const getSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.find();
  const settingsMap = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });
  res.json(new ApiResponse(200, { settings: settingsMap }));
});

const getSetting = asyncHandler(async (req, res) => {
  const setting = await Settings.findOne({ key: req.params.key });
  if (!setting) {
    throw new ApiError(404, 'Setting not found');
  }
  res.json(new ApiResponse(200, { setting }));
});

const updateSetting = asyncHandler(async (req, res) => {
  const { value, description } = req.body;
  const setting = await Settings.findOneAndUpdate(
    { key: req.params.key },
    { value, description },
    { upsert: true, new: true, runValidators: true }
  );
  res.json(new ApiResponse(200, { setting }, 'Setting updated successfully'));
});

module.exports = { getSettings, getSetting, updateSetting };
