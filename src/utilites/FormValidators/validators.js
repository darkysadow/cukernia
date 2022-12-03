export const required = value => {
    if(value) return undefined
    return 'Це обов\'язкове поле'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) return `Максимум ${maxLength} символів`
    return undefined
}

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)