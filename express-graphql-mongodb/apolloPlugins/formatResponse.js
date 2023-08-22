const MAX_PAYLOAD_SIZE_REGEX = new RegExp('.{1,3800}', 'g')


export const formatResponse = () => ({
	requestDidStart: () => ({
		willSendResponse({ contextValue: { req, res: response } }) {

			const sanitizedResponse = {
                ...{data: response.data },
                ...{errors: response.errors},
                ...{extensions:response.extensions}
            }

            const stringifiedResponse = JSON.stringify(sanitizedResponse)

			stringifiedResponse.match(MAX_PAYLOAD_SIZE_REGEX).forEach((chunk, i) => {
				req.logger.error('max 3800 character')
			})
		}
	})
})