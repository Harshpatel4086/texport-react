export const challanColumns = [
    {
        key: "formatted_challan_number",
        label: "Challan No",
        sortable: true,
        sortKey: "challan_number"
    },
    {
        key: "party.party_name",
        label: "Party Name",
        sortable: false,
        render: (item) => item.party?.party_name || '-'
    },
    {
        key: "total_meter",
        label: "Total Meter",
        sortable: true,
        render: (item) => `${item.total_meter} m`
    },
    {
        key: "total_lots",
        label: "Lot Count",
        sortable: true
    },
    {
        key: "date",
        label: "Date",
        sortable: true,
        render: (item) => new Date(item.date).toLocaleDateString()
    }
];
