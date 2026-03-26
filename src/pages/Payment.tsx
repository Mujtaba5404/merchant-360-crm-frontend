import { Stack } from "@mantine/core";
import AddPaymentLinksButton from "../features/payment/AddPaymentLinksButton";
import PaymentLinksTable from "../features/payment/PaymentLinksTable";

const Payment = () => {
  return (
    <>
      <Stack gap={"lg"}>
        <AddPaymentLinksButton />
        <PaymentLinksTable />
      </Stack>
    </>
  );
};
export default Payment;
