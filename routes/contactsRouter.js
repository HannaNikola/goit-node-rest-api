import express from "express";
import {
  getAllContacts,
  getOneContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import tokenAuth from "../helpers/tokenAuth.js";

const contactsRouter = express.Router();

contactsRouter.get("/",tokenAuth, getAllContacts);

contactsRouter.get("/:id",tokenAuth, getOneContact);

contactsRouter.delete("/:id",tokenAuth, deleteContact);


contactsRouter.post(
  "/",
  tokenAuth,validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  tokenAuth,validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  tokenAuth,validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
