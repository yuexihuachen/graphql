
export const headerLogger = (options = {}) => {
	return {
		requestDidStart({
			contextValue: { req }
		}) {
            const whitelist = options.whitelist || {}
            const {headers} = req

			Object.keys(headers).forEach((headerName) => {
				if (whitelist.includes(headerName)) {
					req.logger.info(headers[headerName])
				}
			})
		}
	}
}