import { formatMachineNumber } from '@/Utils/helpers';

export const machineColumns = [
    {
        key: "number",
        label: "Machine Number",
        sortable: true,
        render: (item) => formatMachineNumber(item.number),
    },
    {
        key: "description",
        label: "Description",
        sortable: true,
        render: (item) => item.description || '-',
    },
    {
        key: "created_at",
        label: "Created At",
        sortable: true,
        render: (item) => new Date(item.created_at).toLocaleDateString(),
    },
];
