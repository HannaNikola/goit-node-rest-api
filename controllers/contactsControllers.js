import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";




export const getAllContacts = async (req, res) => {
    try {
        const data = await contactsService.listContacts();
        res.status(200).json(data);
    } catch (error) {
      res.status(500)
    }
};


export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await contactsService.getContactById(id);
        if (!data) {
            throw HttpError(404);
        }
        res.status(200).json(data);
    }catch (error) {
        next(error);
    };
}
export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await contactsService.removeContact(id);
        if (!data) {
            throw HttpError(404);
        }
        res.status(200).json({message:"Sucsess"});

    } catch (error) {
        next(error)
    }
};

export const createContact = async (req, res, next) => {
    try {
        const data = await contactsService.addContact(req.body);
        res.status(201).json(data);
     } catch (error) {
    next(error)
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await contactsService.updateContact(id, req.body);
        if (!data) {
            throw HttpError(404);
        }
         res.status(200).json(data);
     }
    catch (error) {
      next(error)
  }
};



// Помилка в параметрах updateContact. 
// Вам не мають в боді надсилати ід контакту, це окремий параметр.