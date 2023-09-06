import nodeEnv from "kiwi-environment";

const IS_PROD = nodeEnv.isProd();

const errorByCode = {
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    GRAPHQL_PARSE_FAILED: 'GRAPHQL_PARSE_FAILED',
    GRAPHQL_VALIDATION_FAILED: 'GRAPHQL_VALIDATION_FAILED',
    PERSISTED_QUERY_NOT_FOUND: 'PERSISTED_QUERY_NOT_FOUND',
    PERSISTED_QUERY_NOT_SUPPORTED: 'PERSISTED_QUERY_NOT_SUPPORTED',
    BAD_USER_INPUT: 'BAD_USER_INPUT',
    OPERATION_RESOLUTION_FAILURE: 'OPERATION_RESOLUTION_FAILURE',
    BAD_REQUEST: 'BAD_REQUEST',
	FORBIDDEN: 'NOT_AUTHORIZED',
	UNAUTHENTICATED: 'AUTHENTICATION_FAILURE',
    INTROSPECTION_DISABLED: 'INTROSPECTION_DISABLED'
}

export const formatError = (formattedError, otherError) => {
    const error = formattedError
    if (error?.message && IS_PROD) {
        error.message = error.message
    }

    if (error?.extensions?.code) {
        error.extensions.name = 'UNKNOWN'
        error.extensions.details = error.extensions.details || []
        error.extensions.details.push({
            issue: error.extensions.code,
            description: error.extensions.stacktrace
        })
        if (errorByCode[error.extensions.code]) {
            error.extensions.name = errorByCode[error.extensions.code]
        }
    }

	return error
}



  