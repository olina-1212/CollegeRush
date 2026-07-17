import { workPostSchema } from "../validations/workPostSchema.js";

import {
  createWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
} from "../services/workService.js";

export const createWorkPost = async (req, res) => {
  try {
    const validated = workPostSchema.parse(req.body);

    const work = await createWork(
      validated,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: "Work post created successfully.",
      data: work,
    });
  } catch (err) {
    console.error(err);

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getWorkPosts = async (req, res) => {
  try {
    const works = await getAllWorks();

    return res.json({
      success: true,
      data: works,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch work posts.",
    });
  }
};

export const getWorkPost = async (req, res) => {
  try {
    const work = await getWorkById(req.params.id);

    if (!work) {
      return res.status(404).json({
        success: false,
        message: "Work post not found.",
      });
    }

    return res.json({
      success: true,
      data: work,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch work post.",
    });
  }
};

export const updateWorkPost = async (req, res) => {
  try {
    const validated = workPostSchema.parse(req.body);

    const work = await updateWork(
      req.params.id,
      req.user.id,
      validated
    );

    return res.json({
      success: true,
      message: "Work post updated successfully.",
      data: work,
    });
  } catch (err) {
    console.error(err);

    const status =
      err.message === "Unauthorized"
        ? 403
        : err.message === "Work not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteWorkPost = async (req, res) => {
  try {
    await deleteWork(
      req.params.id,
      req.user.id
    );

    return res.json({
      success: true,
      message: "Work post deleted successfully.",
    });
  } catch (err) {
    console.error(err);

    const status =
      err.message === "Unauthorized"
        ? 403
        : err.message === "Work not found"
        ? 404
        : 400;

    return res.status(status).json({
      success: false,
      message: err.message,
    });
  }
};