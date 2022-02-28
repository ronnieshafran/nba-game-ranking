using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Lambda.Core;
using DateFetcher;
using DateFetcher.Data_Model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace UpdateDBDaily
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class UpdateDBDaily
    {
        /// <summary>
        /// Your Lambda's input type.
        /// Change this to match whatever event you intend to send, or
        /// use one of the Amazon.Lambda.XXXEvents NuGet packages
        /// </summary>
        public class LambdaEvent
        {
            public string eventArg { get; set; }
        }

        // If you rename this function, you will need to update the invocation shim
        // to match if you intend to test the function with 'amplify mock function'
#pragma warning disable CS1998
        public async Task LambdaHandler(LambdaEvent input, ILambdaContext context)
        {
            var client = new AmazonDynamoDBClient();
            IDynamoDBContext dbContext = new DynamoDBContext(client);
            var today = DateTime.Now.ToString("yyyy-MM-dd");
            await WriteGamesFromDate(today, dbContext);
            if (DateTime.Now.DayOfWeek == DayOfWeek.Monday)
            {
                var yesterday = DateTime.Today.AddDays(-1).ToString("yyyy-MM-dd");
                await WriteGamesFromDate(yesterday, dbContext);
            }
        }

        private static async Task WriteGamesFromDate(string today, IDynamoDBContext dbContext)
        {
            var games = await GamesProvider.GetGamesFromDate(today);
            foreach (var game in games)
            {
                await dbContext.SaveAsync(game);
            }
        }
    }
}
