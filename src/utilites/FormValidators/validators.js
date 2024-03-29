export const required = value => {
    if(value && value!=='') return undefined
    return 'Обов\'язково'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if(value.length > maxLength) return `Максимум ${maxLength} символів`
    return undefined
}

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)