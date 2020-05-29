const Joi = require("joi");
const log = require("./../../../utils/logger");

const guitarBluePrint = Joi.object().keys({
  description: Joi.string().max(100).required(),
  price: Joi.number().positive().precision(2).required(),
  money: Joi.string().length(3).uppercase().required(),
});

const _vGuitar = (req, res, next) => {
  let response = Joi.validate(req.body, guitarBluePrint, { abortEarly: false, convert: false});
  if (response.error === null) {
    next()
  } else {
    //console.log(response.error.details);
    let errDetails = response.error.details.reduce((acc, err) => acc + `[${err.message}]`, "")
    log.warn('El siguiente producto no pasó la validación: ', req.body, errDetails)
    res.status(400).json(`Tu producto no cumple con la estructura, Errores en tu request: ${errDetails}`);
  }
}

module.exports = _vGuitar