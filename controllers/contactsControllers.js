import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  console.log(req.user)
  try {
    
    const owner = req.user._id;
    const data = await contactsService.listContacts(owner, req.query);
    console.log(data);
    res.send(data).status(200);
  } catch (error) {
    res.status(500);
  }
};



export const getOneContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const data = await contactsService.getContactById(id, owner);
    if (!data) {
      throw HttpError(404);
    }

    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
};

// export const deleteContact = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { id: owner } = req.user;
//     const data = await contactsService.removeContact(id, owner);
//     if (!data) {
//       throw HttpError(404);
//     }
//     res.send(data).status(200).json({ message: "Success" });
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user; 
    const data = await contactsService.removeContact(id, owner);
    if (!data) {
      throw  HttpError(404, "Not Found"); 
    }
    
    res.status(200).json({ message: "Success", contact: data });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const data = await contactsService.addContact({...req.body, owner});
    res.send(data).status(201);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id: owner } = req.user;
    const { id } = req.params;
    const data = await contactsService.updateContact(id, req.body, owner);
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
    const { id: owner } = req.user;
    const { id } = req.params;
    const data = await contactsService.updateStatus(id, req.body, owner);
    if (!data) {
      throw HttpError(404);
    }
    res.send(data).status(200);
  } catch (error) {
    next(error);
  }
};
