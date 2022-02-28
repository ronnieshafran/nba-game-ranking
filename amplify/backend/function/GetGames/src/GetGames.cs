using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using GetGames.Models;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace GetGames
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class GetGames
    {
        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        /// <remarks>
        /// If you rename this function, you will need to update the invocation shim
        /// to match if you intend to test the function with 'amplify mock function'
        /// </remarks>
#pragma warning disable CS1998
        public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            var response = new APIGatewayProxyResponse
            {
                Headers = new Dictionary<string, string>
                {
                    { "Access-Control-Allow-Origin", "*" },
                    { "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" }
                }
            };

            string contentType = null;
            request.Headers?.TryGetValue("Content-Type", out contentType);

            switch (request.HttpMethod)
            {
                case "GET":
                    context.Logger.LogLine($"Get Request: {request.Path}\n");
                    context.Logger.LogLine($"Path params: {request.PathParameters}\n");
                    context.Logger.LogLine($"Resource paths: {request.RequestContext.ResourcePath}\n");
                    if (request.PathParameters.ContainsKey("date"))
                    {
                        response.StatusCode = (int)HttpStatusCode.OK;
                        var requestedDate = request.PathParameters["date"];
                        var amazonDbClient = new AmazonDynamoDBClient();
                        IDynamoDBContext dbContext = new DynamoDBContext(amazonDbClient);
                        var games = await dbContext.QueryAsync<Game>(requestedDate).GetRemainingAsync();
                        response.Body = JsonSerializer.Serialize(games);
                    }
                    else
                    {
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        response.Body = "No date specified";
                    }
                    response.Headers["Content-Type"] = "application/json";
                    break;
                case "POST":
                    context.Logger.LogLine($"Post Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType))
                    {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }

                    context.Logger.LogLine($"Body: {request.Body}");
                    response.StatusCode = (int)HttpStatusCode.Forbidden;
                    break;
                case "PUT":
                    context.Logger.LogLine($"Put Request: {request.Path}\n");
                    if (!String.IsNullOrEmpty(contentType))
                    {
                        context.Logger.LogLine($"Content type: {contentType}");
                    }

                    context.Logger.LogLine($"Body: {request.Body}");
                    response.StatusCode = (int)HttpStatusCode.Forbidden;
                    break;
                case "DELETE":
                    context.Logger.LogLine($"Delete Request: {request.Path}\n");
                    response.StatusCode = (int)HttpStatusCode.Forbidden;
                    break;
                default:
                    context.Logger.LogLine($"Unrecognized verb {request.HttpMethod}\n");
                    response.StatusCode = (int)HttpStatusCode.Forbidden;
                    break;
            }

            return response;
        }
    }
}