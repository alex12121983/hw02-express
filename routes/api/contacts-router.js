import express from "express";

import contactsController from "../../controllers/contacts-controller.js";

import * as ContactSchemas from "../../models/Contact.js";

import { validateBody } from "../../decorators/index.js";

import { authenticate, upload, isValidId } from "../../middlewares/index.js";

const contactAddValidate = validateBody(ContactSchemas.contactAddSchema);
const contactUpdateFavoriteValidate = validateBody(
  ContactSchemas.contactUpdateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", contactAddValidate, contactsController.add);

contactsRouter.put(
  "/:id",
  isValidId,
  contactAddValidate,
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactsController.updateById
);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

export default contactsRouter;
