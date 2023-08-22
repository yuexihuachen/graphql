export const myPlugin = {
    // Fires whenever a GraphQL request is received from a client.
    async requestDidStart({ request: { query } }) {
        //console.log('Request started! Query:\n' + requestContext.request.query);
        console.log('Request started! Query:\n');
        //console.log(query)
        return {
            // Fires whenever Apollo Server will parse a GraphQL
            // request to create its associated document AST.
            async parsingDidStart(context) {
                console.log('Parsing started!');
            },

            // Fires whenever Apollo Server will validate a
            // request's document AST against your GraphQL schema.
            async validationDidStart(context) {
                console.log('Validation started!');
            },
        };
    },
};

export const responsePlugin = {
    requestDidStart: () => ({
      willSendResponse: ({ response }) => {
        response.data = response.data || null
      }
    })
  }