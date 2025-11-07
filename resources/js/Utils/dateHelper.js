export const formatDate = (date, format = 'dd/mm/yyyy') => {
    if (!date) return '--';
    
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    switch(format) {
        case 'input': return d.toISOString().split('T')[0];
        case 'dd/mm/yyyy': return `${day}/${month}/${year}`;
        default: return `${day}/${month}/${year}`;
    }
};

export const formatDateForInput = (date) => formatDate(date, 'input');
