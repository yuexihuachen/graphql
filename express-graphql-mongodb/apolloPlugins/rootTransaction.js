import { logEvent } from "../lib/utils"

export const rootTransaction = (options) => ({
	requestDidStart: ({ contextValue: {
        req
    }  }) => {
		const logger = logEvent()
        req.logger = logger
	}
})