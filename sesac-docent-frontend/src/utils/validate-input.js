export const validateName = (name) => {
  return /^[가-힣]{2,16}$/.test(name);
};
export const validateNickname = (name) => {
  return /^[A-Za-z가-힣0-9]{2,16}$/.test(name);
};
export const validatePhone = (phone) => {
  return /^[0-9]{11}$/.test(phone);
};
export const validateBirth = (birth) => {
  return /^[0-9]{8}$/.test(birth);
};
export const validateEmail = (email) => {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
};
export const validateID = (id) => {
  return /^[a-z0-9_-]{4,20}$/.test(id);
};
export const validatePassword = (pw) => {
  return /^[a-zA-Z\d@!#$%^&*]{8,16}$/.test(pw);
};
export const validateConfirm = (pw1, pw2) => {
  return pw1 === pw2;
};
export const validateAuthNumber = (authNumber) => {
  return /^[0-9]{6}$/.test(authNumber);
};
export const isAdult = (birthDateString) => {
  const birthYear = parseInt(birthDateString.substr(0, 4));
  const birthMonth = parseInt(birthDateString.substr(4, 2));
  const birthDay = parseInt(birthDateString.substr(6, 2));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let age = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age -= 1;
  }

  return age >= 19;
};
