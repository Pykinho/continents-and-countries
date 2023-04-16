export class WrongInputError extends Error {
  constructor(message = '', ...args) {
    super(message, ...args);
    this.name = 'WrongInputError';
    this.message = message;
  }
}
