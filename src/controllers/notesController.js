import createError from 'http-errors';
import { Note } from '../models/note.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getAllNotes = async (req, res, next) => {
  try {
    const page = Number(req.query.page ?? 1);
    const perPage = Number(req.query.perPage ?? 10);
    const { tag, search = '' } = req.query;
    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      const searchRegex = new RegExp(escapeRegex(search), 'i');
      filter.$or = [{ title: searchRegex }, { content: searchRegex }];
    }

    const [notes, totalNotes] = await Promise.all([
      Note.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage),
      Note.countDocuments(filter),
    ]);

    res.status(200).json({
      page,
      perPage,
      totalNotes,
      totalPages: Math.ceil(totalNotes / perPage),
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      throw createError(404, 'Note not found');
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!note) {
      throw createError(404, 'Note not found');
    }

    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);

    if (!note) {
      throw createError(404, 'Note not found');
    }

    res.status(200).json({ message: 'Note deleted', note });
  } catch (error) {
    next(error);
  }
};