const Joi = require('joi'); 

module.exports.body = (schema) => { 
  return (req, res, next) => { 
    const { error } = Joi.validate(req.body, schema); 
    const valid = error == null; 

    if (valid) { 
        next(); 
    } else { 
        const { details } = error; 
        const message = details.map(i => i.message.replace(' is not allowed'));
        
        res.status(400).json({ 
            success: false,
            errors: message
        }) } 
    } 
}

module.exports.paramsAndBody = (schemaParams, schemaBody) => { 
    return (req, res, next) => { 
      const { errorBody } = Joi.validate(req.body, schemaBody); 
      const { errorParams } = Joi.validate(req.params, schemaParams); 

      if (!errorBody && !errorParams) { 
          next(); 
      } else { 
          const { detailsBody } = errorBody; 
          const { detailsParams } = errorParams; 

          let message = detailsBody.map(i => i.message.replace(' is not allowed'));
          message = detailsParams.map(i => i.message.replace(' is not allowed'));

          res.status(400).json({ 
              success: false,
              errors: message
          }) } 
      } 
  }