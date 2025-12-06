export const workerColumns = [
    {
        key: "name",
        label: "Name",
        sortable: true,
    },
    {
        key: "phone",
        label: "Phone",
        sortable: true,
        render: (item) => item.phone || '-',
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
        render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
];