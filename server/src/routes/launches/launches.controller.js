const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
} = require("../../models/lauches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}
function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  const aborted = abortLaunch(launchId);
  if (!existsLaunchWithId(launchId)) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }
  return res.status(200).json(aborted);
}
module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
