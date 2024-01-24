import CheckoutTemplate from "/src/components/CheckoutTemplate";
import Input from "/src/components/Input";
import Checkbox from "/src/components/Checkbox";
import FormCol from "/src/components/FormCol";
import FormRow from "/src/components/FormRow";
import Button from "/src/components/Button";
import { useCheckout } from "/src/contexts/CheckoutContext";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutContact = () => {
  const {
    checkoutInfo,
    updateCheckoutInfo,
    handleFormChange,
    populateFormData,
    handleFormSubmit,
  } = useCheckout();
  const navigate = useNavigate();
  const formEl = useRef();

  useEffect(
    () => populateFormData(formEl, "contact", "shipping"),
    [formEl.current],
  );

  return (
    <div>
      <CheckoutTemplate
	formEl={formEl}
	curStepID="contact"
	nextStepID="shipping"
        >
        <form ref={formEl}>
          <FormCol className="text-left">
            <Input name="name" label="Full Name" placeholder="" required />
            <Input
              name="email"
              label="Email Address"
              placeholder="user@mail.com"
              type="email"
              required
              pattern={/^\S+@[a-z]+\.[a-z]+$/}
              invalidMessage="Please enter a valid e-mail address!"
            />
            <Input
              name="mobile"
              label="Mobile Number"
              placeholder="+91XXXXXXXXXX"
              type="tel"
              required
              pattern={/^(\+91|0)?\d{10}$/}
              invalidMessage="Please enter a 10 digit Indian mobile number!"
            />
            <Input
              name="altMobile"
              label="Alternate Mobile Number"
              placeholder="+91XXXXXXXXXX"
              type="tel"
              pattern={/^(\+91|0)?\d{10}$/}
              invalidMessage="Please enter a 10 digit Indian mobile number!"
            />
          </FormCol>
        </form>
      </CheckoutTemplate>
    </div>
  );
};

export default CheckoutContact;
