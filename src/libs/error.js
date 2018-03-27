module.exports = {
  getErrorString
};

function getErrorString(requiredArgs) {
  let errorString = "";
  requiredArgs.forEach((field, index) => {
    errorString += `The ${field} is required`;
    if (index != requiredArgs.length - 1) {
      errorString += `, `;
    }
  });
  console.log("errorString", errorString);
  return errorString;
}
