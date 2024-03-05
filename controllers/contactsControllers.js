import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  try {
    const data = await contactsService.listContacts();
    res.send(data).status(200);
  } catch (error) {
    res.status(500);
  }
};

export const getOneContact = async (req, res) => {
  // console.log(req.user);
  try {
    const { id } = req.params;
    const data = await contactsService.getContactById(id);
    if (!data) {
      throw HttpError(404);
    }
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await contactsService.removeContact(id);
    if (!data) {
      throw HttpError(404);
    }
    res.send(data).status(200).json({ message: "Success" });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const data = await contactsService.addContact(req.body);
    res.send(data).status(201);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactsService.updateContact(id, req.body);
    if (!data) {
      throw HttpError(404);
    }
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactsService.updateStatus(id, req.body);
    if (!data) {
      throw HttpError(404);
    }
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
};
