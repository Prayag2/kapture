export const useValidate = () => {
  const isValid = (pattern, value, required) => {
    if (
      !pattern.test(value) &&
      (!required ? value.length > 0 : true)
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleFormSubmit = (formEl) => {
    if (formEl.checkValidity()) {
      formEl.requestSubmit();
    } else {
      formEl.reportValidity();
    }
  }
  return {isValid, handleFormSubmit};
};
