
export const errorLogger = () => ({
	requestDidStart: () => ({
		didEncounterErrors: ({ contextValue: { req }, errors = [] }) => {
			errors.forEach((error) => {
				const { message, extensions = {} } = error
				const { code } = extensions

                req.logger.error(`${code}: ${message}`)
			})
		}
	})
})


