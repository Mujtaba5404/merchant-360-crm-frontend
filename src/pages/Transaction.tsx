import { useState } from "react";
import TransactionsTable from "../features/transactions/TransactionTable";
import StatsGridIcons from "../components/StatsGridIcons";

const Transactions = () => {
   const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  return (
    <>
      <StatsGridIcons onSelectProvider={setSelectedProvider} />
      <TransactionsTable selectedProvider={selectedProvider} />
    </>
  );
};
export default Transactions;
