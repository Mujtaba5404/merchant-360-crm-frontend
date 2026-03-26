import { Badge } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import formatDate from "../../utils/formatDate";
import formatAmount from "../../utils/formatAmount";

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

// ✅ Simple Dummy Data
const DUMMY_DATA = Array.from({ length: 25 }, (_, i) => ({
  transactionDate: new Date(),
  provider: "stripe",
  transactionId: `TXN${i + 1}`,
  amount: Math.floor(Math.random() * 5000),
  status: ["success", "pending", "failed"][i % 3],
  accountType: ["visa", "mastercard", "amex"][i % 3],
  last4: `${1000 + i}`,
}));

const PaymentLinksTable = ({ hideColumns = [] }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const from = (page - 1) * pageSize;
  const to = from + pageSize;
  const records = DUMMY_DATA.slice(from, to);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return (
    <DataTable
      idAccessor="transactionId"
      withColumnBorders
      withTableBorder
      borderRadius="md"
      rowStyle={() => ({ height: 55 })}
      page={page}
      onPageChange={setPage}
      recordsPerPage={pageSize}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      totalRecords={DUMMY_DATA.length}
      records={records}
      columns={DEFAULT_COLUMNS().filter(
        (column) => !hideColumns.includes(column.accessor),
      )}
    />
  );
};

export default PaymentLinksTable;