// Para devolver un error de Boom, requerimos boom
const boom = require('@hapi/boom');
const joi = require('joi');

function validate(data, schema) {
  // Si el esquema no es un esquema joi, conviértalo en un objeto de esquema joi; de lo contrario, devuelva el esquema
  schema = !joi.isSchema(schema) ? joi.object(schema) : schema;
  const { error } = schema.validate(data);
  return error;
}

function validationHandler(schema, data = 'body') {
  return function (req, res, next) {
    const error = validate(req[data], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;