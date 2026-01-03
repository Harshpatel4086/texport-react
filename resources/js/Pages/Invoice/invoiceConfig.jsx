export const invoiceColumns = [
    {
        key: "formatted_invoice_number",
        label: "Invoice No",
        sortable: true,
        sortKey: "invoice_number",
    },
    {
        key: "challan.formatted_challan_number",
        label: "Challan No",
        sortable: false,
        render: (item) => {
            if (item.challan?.challan_number) {
                return `#CHL-${String(item.challan.challan_number).padStart(6, '0')}`;
            }
            return '--';
        },
    },
    {
        key: "party.party_name",
        label: "Party Name",
        sortable: false,
        render: (item) => item.party?.party_name || '--',
    },
    {
        key: "quality.quality_name",
        label: "Quality",
        sortable: false,
        render: (item) => item.quality?.quality_name || '--',
    },
    {
        key: "total_meter",
        label: "Total Meter",
        sortable: true,
        render: (item) => `${item.total_meter} m`,
    },
    {
        key: "final_amount",
        label: "Final Amount",
        sortable: true,
        render: (item) => `₹${parseFloat(item.final_amount).toLocaleString()}`,
    },
    {
        key: "date",
        label: "Date",
        sortable: true,
        render: (item) => new Date(item.date).toLocaleDateString(),
    },
];