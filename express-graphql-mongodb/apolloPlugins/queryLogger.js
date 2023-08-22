export const queryLogger = () => ({
	requestDidStart: () => {
		let didLogQuery = false

		return {
			didResolveOperation: ({ request: { query }}) => {
				didLogQuery = true
			},
			didEncounterErrors: ({ contextValue: { req },request: { query } }) => {
                // console.log('************************************************************')
                // console.log(error)
				if (!didLogQuery) {
					req.logger.info(query)
				}
			}
		}
	}
})