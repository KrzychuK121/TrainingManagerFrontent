export function getBasicBodyParametersFrom(formData) {
    return {
        sex: formData.get('sex'),
        age: parseInt(formData.get('age')),
        height: parseInt(formData.get('height')),
        weight: parseFloat(formData.get('weight'))
    };
}