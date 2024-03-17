const ValidationsRegExp = (value, fieldName) => {
    const validations = {
      firstname: /^[a-zA-Z]+$/,
      lastname: /^[a-zA-Z]+$/,
      colonyName: /^[a-zA-Z0-9]+$/,
      street: /^[a-zA-Z0-9]+$/,
      addressDescription: /^[a-zA-Z0-9]+$/,
      phone: /^\d{8}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      price: /^\d+(.*\d{1,2})?$/,
    };
  
    const regex = validations[fieldName];
    if (regex) {
      return regex.test(value);
    }
    return true;
  };
  
  export default ValidationsRegExp;
  