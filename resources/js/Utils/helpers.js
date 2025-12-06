export const formatMachineNumber = (number) => {
    if (number === null || number === undefined) {
        return '--';
    }
    return "#MCH-" + number.toString().padStart(6, "0");
};
