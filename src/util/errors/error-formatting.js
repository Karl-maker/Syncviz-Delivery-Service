module.exports = { handleDuplicateKeyError, handleValidationError };

//handle email or username duplicates
function handleDuplicateKeyError(err, res) {
  const field = Object.keys(err.keyValue);
  const code = 409;
  res.status(code).json({
    message: `${field} Already Has An Account`,
    fields: field,
  });
}

function handleValidationError(err, res) {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;
  if (errors.length > 1) {
    const formattedErrors = errors.join(" ");
    res.status(code).send({ messages: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ messages: errors, fields: fields });
  }
}
