import { useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import CheckoutTemplate from "/src/components/CheckoutTemplate";
import Input from "/src/components/Input";
import Checkbox from "/src/components/Checkbox";
import FormCol from "/src/components/FormCol";
import FormRow from "/src/components/FormRow";
import Button from "/src/components/Button";
import { useCheckout } from "/src/contexts/CheckoutContext";
import { useDialog } from "/src/contexts/DialogContext";

const CheckoutContact = () => {
  const { checkoutInfo, updateCheckoutInfo } = useCheckout();
  const { showAlert } = useDialog();
  const navigate = useNavigate();
  const formEl = useRef();

  const handleFormSubmit = () => {
    if (formEl.current.checkValidity()) {
      const formData = new FormData(formEl.current);
      const name = formData.get("name");
      const email = formData.get("email");
      const mobile = formData.get("mobile");
      const altMobile = formData.get("altMobile");
      updateCheckoutInfo(0, "completed", true);
      updateCheckoutInfo(1, "condition", true);
      updateCheckoutInfo(0, "formInfo", {name, email, mobile, altMobile}).then(()=>{
	navigate("/checkout/shipping");
      })
    } else {
      formEl.current.reportValidity();
    }
  };

  const setValue = (name, value) => {
    const el = document.getElementById(name);
    if (el) el.value = value;
  }

  useEffect(()=>{
    if (checkoutInfo.checkoutInfo[0].completed && formEl.current) {
      setValue("name", checkoutInfo.checkoutInfo[0].formInfo.name);
      setValue("email", checkoutInfo.checkoutInfo[0].formInfo.email);
      setValue("mobile", checkoutInfo.checkoutInfo[0].formInfo.mobile);
      setValue("altMobile", checkoutInfo.checkoutInfo[0].formInfo.altMobile);
    }
  }, [formEl.current]);

  return (
    <div>
      <CheckoutTemplate onSubmit={() => handleFormSubmit()}>
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
	      pattern={/^(\+91)?\d{10}$/}
	      invalidMessage="Please enter a 10 digit Indian phone number!"
            />
            <Input
              name="altMobile"
              label="Alternate Mobile Number"
              placeholder="+91XXXXXXXXXX"
              type="tel"
	      pattern={/^(\+91)?\d{10}$/}
	      invalidMessage="Please enter a 10 digit Indian phone number!"
            />
            {/*
            <Button
              onClick={() => {
                updateCheckoutInfo(0, "completed", true);
		updateCheckoutInfo(1, "condition", true)
              }}>
              Verify Now
            </Button>
          <Input name="otp" label="Enter OTP" placeholder="XXXXXX" />*/}
          </FormCol>
        </form>
      </CheckoutTemplate>
    </div>
  );
};

export default CheckoutContact;
