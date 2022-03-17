export const validateEmail = (mail) => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  return regex.test(mail) ? true : false;
};

export const validatePhone = (phone) => {
  return !isNaN(phone) && phone.length === 10 ? true : false;
};

export const validatePassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;

  return regex.test(password) ? true : false;
};

// /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
/**
 * /^            : Start
(?=.{8,})        : Length
(?=.*[a-zA-Z])   : Letters
(?=.*\d)         : Digits
(?=.*[!#$%&? "]) : Special characters
$/              : End



    (/^
    (?=.*\d)                //should contain at least one digit
    (?=.*[a-z])             //should contain at least one lower case
    (?=.*[A-Z])             //should contain at least one upper case
    [a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters

    $/)

Example:-   /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/
 * 
 */
