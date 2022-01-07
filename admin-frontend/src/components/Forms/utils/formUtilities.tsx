export const getValidationErroMessage = (errorMessages: { [key: string]: any }) => {
  const message = Object.entries(errorMessages).map(([key, value]) => `${key}: ${value?.message} \n`);
  return message.join("");
};
