exports.map = [
  // Sequelize Error
  {
    name: 'SequelizeValidationError',
    type: 'notNull Violation',
    code: 001,
    statusCode: 400,
  },
  {
    name: 'SequelizeUniqueConstraintError',
    type: 'unique violation',
    code: 002,
    statusCode: 400,
  },
  {
    name: 'SequelizeForeignKeyConstraintError',
    message: 'Invalid foreign key',
    code: 004,
    statusCode: 400,
  },
  {
    name: 'SequelizeValidationError',
    type: 'Validation error',
    code: 005,
    statusCode: 400,
  },
  // Custom Error
  {
    name: 'passwordMissing',
    message: 'Missing PASSWORD',
    code: 006,
    statusCode: 400
  },
  {
    name: 'emailMissing',
    message: 'Missing EMAIL',
    code: 007,
    statusCode: 400
  },
  {
    name: 'missingProperties',
    message: 'Missing Picture Properties',
    code: 008,
    statusCode: 400
  },
  {
    name: 'unauthorized',
    message: 'unauthorized',
    code: 009,
    statusCode: 401,
  },
  {
    name: 'cryptoCurrencyMissing',
    message: 'Missing crypto currency',
    code: 010,
    statusCode: 400
  },
  {
    name: 'disabledAccount',
    message: 'Account must be reactivated',
    code: 011,
    statusCode: 403
  },
  {
    name: 'notVerifiedAccount',
    message: 'Check your email to enable your account',
    code: 012,
    statusCode: 403
  },
  {
    name: 'accountNotFound',
    message: 'credentials not matching',
    code: 013,
    statusCode: 404
  },
  {
    name: 'checkPasswordMissing',
    message: 'Missing password to check you credentials',
    code: 014,
    statusCode: 401
  },
  {
    name: 'InvalidDate',
    message: 'date invalide',
    code: 015,
    statusCode: 401
  },
  // Database Error
  {
    name: 'SequelizeDatabaseError',
    code: 101,
    statusCode: 400,
  },
  // Http Error
  {
    name: 'HttpStatusError',
    type: '',
    code: 201,
    statusCode: 404,
  },
  {
    name: 'missingPicture',
    type: '',
    code: 202,
    message: 'Missing Picture',
    statusCode: 400,
  },
  {
    name: 'invalidPictureSize',
    type: '',
    code: 203,
    message: 'The picture is to big',
    statusCode: 413,
  },
  {
    name: 'invalidPictureFormat',
    type: '',
    code: 204,
    message: 'The file is not a valid picture',
    statusCode: 400,
  },
  {
    name: 'bitgoNotFound',
    type: '',
    code: 300,
    message: 'Veuillez contacter le support contact@antmine.io',
    statusCode: 503,
  },
  {
    name: 'antmineNotFound',
    type: '',
    code: 301,
    message: 'La somme demandée est supérieure à votre solde actuel',
    statusCode: 503,
  },
  {
    name: 'addrMissing',
    type: '',
    code: 302,
    message: 'ADDR Missing',
    statusCode: 503,
  },
  {
    name: 'balanceMissing',
    type: '',
    code: 303,
    message: 'BALANCE Missing',
    statusCode: 503,
  },
  {
    name: 'tokenMissing',
    type: '',
    code: 310,
    message: 'TOKEN or ID_BITGO_WALLET Missing',
    statusCode: 503,
  }
];
