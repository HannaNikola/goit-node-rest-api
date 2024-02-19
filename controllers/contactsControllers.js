import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js"

export default contactsService;

export const getAllContacts = async (req, res) => {
    try {
        const data = await contactsService.listContacts();
        res.json(data);
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
        res.json(data);
    }
    catch (error) {
        
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
        res.status(200)({
            message: "Delete success"
        })
    } catch (error) {
        next(error)
    }
};

export const createContact = (req, res, next) => {
    try {
        // const { error } = validateBody;
        const data = contactsService.addContact(req.body);
        res.status(201).json(data);
     } catch (error) {
    next(error)
    }
};



export const updateContact = async (req, res, next) => {
  
};



