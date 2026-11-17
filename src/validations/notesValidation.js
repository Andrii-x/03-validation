import { isValidObjectId } from 'mongoose';
import { Joi, Segments } from 'celebrate';
import { TAGS } from '../constants/tags.js';

const noteIdParamsSchema = Joi.object({
  noteId: Joi.string()
    .custom((value, helpers) =>
      isValidObjectId(value) ? value : helpers.error('any.invalid'),
    )
    .required(),
});

const noteBodySchema = {
  title: Joi.string().trim().min(1),
  content: Joi.string().allow(''),
  tag: Joi.string().valid(...TAGS),
};

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

export const noteIdSchema = {
  [Segments.PARAMS]: noteIdParamsSchema,
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    ...noteBodySchema,
    title: noteBodySchema.title.required(),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: noteIdParamsSchema,
  [Segments.BODY]: Joi.object(noteBodySchema).min(1),
};