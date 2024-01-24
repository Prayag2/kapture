import CheckoutTemplate from "/src/components/CheckoutTemplate";
import Input from "/src/components/Input";
import Checkbox from "/src/components/Checkbox";
import FormCol from "/src/components/FormCol";
import FormRow from "/src/components/FormRow";
import Button from "/src/components/Button";
import Select from "/src/components/Select";
import { useCheckout } from "/src/contexts/CheckoutContext";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutShipping = () => {
  const {
    checkoutInfo,
    updateCheckoutInfo,
    handleFormChange,
    handleFormSubmit,
    populateFormData,
  } = useCheckout();
  const navigate = useNavigate();
  const formEl = useRef();

  useEffect(
    () => populateFormData(formEl, "shipping", "payment"),
    [formEl.current],
  );

  return (
    <div>
      <CheckoutTemplate
	formEl={formEl}
	curStepID="shipping"
	nextStepID="payment"
        >
        <form ref={formEl}>
          <FormCol className="text-left">
            <Input
              name="flat"
              label="Flat, House no., Building, Company, Apartment"
              placeholder="E.g. E-12 1st Floor"
              type="text"
              required
              pattern={/^.+$/}
              invalidMessage="Please enter a valid apartment number!"
            />
            <Input
              name="area"
              label="Area, Street, Sector, Village"
              placeholder="E.g. DLF Phase 3"
              type="text"
              required
              pattern={/^.+$/}
              invalidMessage="Please enter a valid street!"
            />
            <Input
              name="landmark"
              label="Landmark"
              placeholder="E.g. Opposite to Ambience Mall"
              type="text"
              pattern={/^.+$/}
              invalidMessage="Please enter a valid landmark!"
            />
            <FormRow>
              <Input
                name="city"
                label="City"
                placeholder="E.g. Gurgaon"
                type="text"
                pattern={/^.+$/}
                invalidMessage="Please enter a valid city!"
		required
              />
              <Select
                name="state"
                label="State"
                placeholder="State"
		required
                options={[
                  "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chhattisgarh",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jammu and Kashmir",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttarakhand",
                  "Uttar Pradesh",
                  "West Bengal",
                  "Andaman and Nicobar Islands",
                  "Chandigarh",
                  "Dadra and Nagar Haveli",
                  "Daman and Diu",
                  "Delhi",
                  "Lakshadweep",
                  "Puducherry",
                ]}
                colour="secondary"
              />
            </FormRow>
          </FormCol>
        </form>
      </CheckoutTemplate>
    </div>
  );
};

export default CheckoutShipping;
