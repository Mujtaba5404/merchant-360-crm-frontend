import { useState } from "react";
import TransactionsTable from "../features/transactions/TransactionTable";
import StatsGridIcons from "../components/StatsGridIcons";

const Transactions = () => {
 const [selectedProvider, setSelectedProvider] = useState(null);

return (
  <>
    <StatsGridIcons onSelectProvider={setSelectedProvider} />
    <TransactionsTable provider={selectedProvider} />
  </>
);
};
export default Transactions;
