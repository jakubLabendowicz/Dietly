import { showNotification } from "./NotificationUtils";

const Joi = require("joi");

export const validate = (schema, data) => {
    const object = Joi.object(schema);
    const { error } = object.validate(data);
    if (error){
        showNotification({
            "text": error.message,
            "type": "error",
            "code": "E0"
        })
        return false;
    }
    return true;
}