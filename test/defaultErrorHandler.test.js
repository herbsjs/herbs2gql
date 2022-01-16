const assert = require('assert')
const { Err } = require('@herbsjs/herbs')
const { defaultErrorHandler } = require('../src/defaultErrorHandler')

describe('defaultErrorHandler', () => {
    it('should throw ForbiddenError when usecase responds with permission denied error', () => {
        const usecaseResponse = Err.permissionDenied({
            message: 'Permission Denied X',
            payload: {
                entity: 'entity Y'
            }
        })

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'ForbiddenError',
            message: 'Permission Denied X',
            extensions: {
                code: 'FORBIDDEN',
                cause: {
                    cause: undefined,
                    code: 'PERMISSION_DENIED',
                    message: 'Permission Denied X',
                    payload: {
                        entity: 'entity Y'
                    }
                }
            }
        })
    })

    it('should throw UserInputError when usecase responds with invalid arguments error', () => {
        const usecaseResponse = Err.invalidArguments({
            message: 'Invalid Arg X',
            args: {
                field: 1
            },
            payload: {
                entity: 'entity Y'
            }
        })

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'UserInputError',
            message: 'Invalid Arg X',
            extensions: {
                code: 'BAD_USER_INPUT',
                cause: {
                    cause: undefined,
                    code: 'INVALID_ARGUMENTS',
                    message: 'Invalid Arg X',
                    payload: {
                        entity: 'entity Y',
                        invalidArgs: {
                            field: 1
                        }
                    }
                }
            }
        })
    })

    it('should throw UserInputError when usecase responds with invalid entity error', () => {
        const usecaseResponse = Err.invalidEntity({
            message: 'Invalid Arg X',
            payload: {
                entity: 'entity Y'
            }
        })

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'UserInputError',
            message: 'Invalid Arg X',
            extensions: {
                code: 'BAD_USER_INPUT',
                cause: {
                    cause: undefined,
                    code: 'INVALID_ENTITY',
                    message: 'Invalid Arg X',
                    payload: {
                        entity: 'entity Y'
                    }
                }
            }
        })
    })

    it('should throw ApolloError when usecase responds with not found error', () => {
        const usecaseResponse = Err.notFound({
            message: 'Invalid Arg X',
            payload: {
                entity: 'entity Y'
            }
        })

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'Error',
            message: 'Invalid Arg X',
            extensions: {
                code: 'NOT_FOUND',
                cause: {
                    cause: undefined,
                    code: 'NOT_FOUND',
                    message: 'Invalid Arg X',
                    payload: {
                        entity: 'entity Y'
                    }
                }
            }
        })
    })

    it('should throw ApolloError when usecase responds with already exists error', () => {
        const usecaseResponse = Err.alreadyExists({
            message: 'Invalid Arg X',
            payload: {
                entity: 'entity Y'
            }
        })

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'Error',
            message: 'Invalid Arg X',
            extensions: {
                code: 'ALREADY_EXISTS',
                cause: {
                    cause: undefined,
                    code: 'ALREADY_EXISTS',
                    message: 'Invalid Arg X',
                    payload: {
                        entity: 'entity Y'
                    }
                }
            }
        })
    })

    it('should throw ApolloError when usecase responds with unknown error', () => {
        const usecaseResponse = Err.unknown({
            message: 'Invalid Arg X',
            payload: {
                entity: 'entity Y'
            }
        })

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'Error',
            message: 'Invalid Arg X',
            extensions: {
                code: 'UNKNOWN',
                cause: {
                    cause: undefined,
                    code: 'UNKNOWN',
                    message: 'Invalid Arg X',
                    payload: {
                        entity: 'entity Y'
                    }
                }
            }
        })
    })

    it('should throw UserInputError when usecase responds with generic error', () => {
        const usecaseResponse = Err('an error occurred')

        assert.throws(() => defaultErrorHandler(usecaseResponse), {
            name: 'UserInputError',
            message: 'null',
            extensions: {
                cause: 'an error occurred',
                code: 'BAD_USER_INPUT'
            }
        })
    })
})
