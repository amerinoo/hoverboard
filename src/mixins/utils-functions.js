/* eslint-disable no-unused-vars */

/* @polymerMixin */
const UtilsFunctions = (subclass) => class extends subclass {
  transformToArray(source, attribute) {
    return source && Object.keys(source)
      .map((key) => Object.assign(attribute ? { [attribute]: key } : {}, source[key]));
  }

  getDate(date) {
    return new Date(date).toLocaleString('en-us', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  isEmpty(array) {
    return !array || !array.length;
  }

  randomOrder(array) {
    return array.sort(() => 0.5 - Math.random());
  }

  generateClassName(value) {
    return value
      ? value.replace(/\W+/g, '-').replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase()
      : '';
  }

  slice(text, number) {
    return text && text.slice(0, number);
  }

  isEqual(string1, string2) {
    return string1 === string2;
  }

  getVariableColor(value) {
    if (ShadyCSS) {
      return ShadyCSS.getComputedStyleValue(this, `--${this.generateClassName(value)}`);
    }
    return getComputedStyle(this, `--${this.generateClassName(value)}`);
  }
};
