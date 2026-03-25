import { Badge, Loader } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";
import {
  useGetAllTransactionsQuery,
  useGetAuthorizeTransactionsQuery,
  useGetBrainTreeTransactionsQuery,
  useGetStripeTransactionsQuery,
} from "../../api/transactions";

const PAGE_SIZES = [10, 20, 30, 50];

const DEFAULT_COLUMNS = () => [
  {
    accessor: "transactionDate",
    textAlign: "center",
    render: (row: any) => formatDate(row.transactionDate),
  },
  {
    accessor: "provider",
    textAlign: "center",
    render: (row: any) =>
      row.provider
        ? row.provider.charAt(0).toUpperCase() + row.provider.slice(1)
        : "-",
  },
  {
    accessor: "transactionId",
    textAlign: "center",
  },
  {
    accessor: "amount",
    textAlign: "center",
    render: (row: any) => formatAmount(row.amount),
  },
  {
    accessor: "status",
    textAlign: "center",
    render: (row: any) => (
      <Badge color="blue" variant="light">
        {row.status}
      </Badge>
    ),
  },
  {
    accessor: "accountType",
    textAlign: "center",
  },
  {
    accessor: "last4",
    textAlign: "center",
  },
];

const TransactionsTable = ({ hideColumns = [], provider }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);


  const { data: allData, isLoading: allLoading } = useGetAllTransactionsQuery();

 
  const { data: stripeData, isLoading: stripeLoading } =
    useGetStripeTransactionsQuery();

  const { data: authorizeData, isLoading: authorizeLoading } =
    useGetAuthorizeTransactionsQuery();

  const { data: braintreeData, isLoading: braintreeLoading } =
    useGetBrainTreeTransactionsQuery();

  let data;
  let isLoading;

  if (!provider) {
    data = allData;
    isLoading = allLoading;
  } else if (provider === "stripe") {
    data = stripeData;
    isLoading = stripeLoading;
  } else if (provider === "authorize") {
    data = authorizeData;
    isLoading = authorizeLoading;
  } else if (provider === "braintree") {
    data = braintreeData;
    isLoading = braintreeLoading;
  }

  const allRecords = data?.data || [];

  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const records = allRecords.slice(from, to);

  useEffect(() => {
    setPage(1);
  }, [pageSize, provider]);

  if (isLoading) return <Loader />;

  return (
    <DataTable
      idAccessor="transactionId"
      withColumnBorders
      withTableBorder
      borderRadius="md"
      pinLastColumn
      rowStyle={() => ({ height: 55 })}
      page={page}
      onPageChange={setPage}
      recordsPerPage={pageSize}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      totalRecords={allRecords.length}
      records={records}
      columns={DEFAULT_COLUMNS().filter(
        (column) => !hideColumns.includes(column.accessor),
      )}
    />
  );
};

export default TransactionsTable;
