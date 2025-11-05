export const validateField = (name, value, validation) => {
    if (!validation) return null;

    // Required validation
    if (validation.required && (!value || value.toString().trim() === '')) {
        return validation.required;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.toString().trim() === '') {
        return null;
    }

    // Min length validation
    if (validation.minLength && value.length < validation.minLength.value) {
        return validation.minLength.message;
    }

    // Max length validation
    if (validation.maxLength && value.length > validation.maxLength.value) {
        return validation.maxLength.message;
    }

    // Pattern validation
    if (validation.pattern && !validation.pattern.value.test(value)) {
        return validation.pattern.message;
    }

    return null;
};

export const validateForm = (data, fields) => {
    const errors = {};
    
    fields.forEach(field => {
        if (field.validation) {
            const error = validateField(field.name, data[field.name], field.validation);
            if (error) {
                errors[field.name] = error;
            }
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};