import { uuid } from "../lib/utils"

export const correlationId = () => ({
	requestDidStart: () => ({
		willSendResponse: ({ contextValue: {
			req,
			res
		} }) => {
			res.extensions = res.extensions || {}
			res.extensions.correlationId = uuid()
		}
	})
})
