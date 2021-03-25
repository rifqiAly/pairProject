function errorHandler(err){
  let specificError = err.errors.map(e=>{
      return e.message
  })
  return specificError
}

module.exports = errorHandler 