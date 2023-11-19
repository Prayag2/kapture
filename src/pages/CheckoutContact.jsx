import CheckoutTemplate from "/src/components/CheckoutTemplate";
import Input from "/src/components/Input";
import FormCol from "/src/components/FormCol";
import FormRow from "/src/components/FormRow";
import Button from "/src/components/Button";
import { useCheckout } from "/src/contexts/CheckoutContext";

const CheckoutContact = () => {
  const { updateCheckoutInfo } = useCheckout();

  return (
    <div>
      <CheckoutTemplate>
        <FormCol className="text-left">
          <Input name="name" label="Full Name" placeholder="" />
          <Input
            name="email"
            label="Email Address"
            placeholder="user@mail.com"
            type="email"
          />
          <FormRow>
            <Input
              name="mobile"
              label="Mobile Number"
              placeholder="+91XXXXXXXXXX"
              type="tel"
            />
            <Button
              onClick={() => {
                updateCheckoutInfo(0, "completed", true);
		updateCheckoutInfo(1, "condition", true)
              }}>
              Verify Now
            </Button>
          </FormRow>
          <Input name="otp" label="Enter OTP" placeholder="XXXXXX" />
        </FormCol>
      </CheckoutTemplate>
    </div>
  );
};

export default CheckoutContact;
