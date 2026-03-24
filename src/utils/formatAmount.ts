const formatAmount = (amount = 0, currency = "USD") => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  });

  return formatter.format(amount);
};

export default formatAmount;
