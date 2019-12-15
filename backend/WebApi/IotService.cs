using Microsoft.Azure.Devices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace WebApi
{
    public class IotService
    {
        private readonly ServiceClient _serviceClient;

        public IotService(ServiceClient serviceClient)
        {
            _serviceClient = serviceClient ?? throw new ArgumentNullException(nameof(serviceClient));
        
        }

        public async Task SendPayloadToDevice(string deviceId, string payload)
        {
            CloudToDeviceMethod method = new CloudToDeviceMethod("message");
            method.SetPayloadJson(payload);
            await _serviceClient.InvokeDeviceMethodAsync(deviceId, method);
        }

        public async Task SendMessageToDevice(string deviceId, string message)
        {
            string duration = message.Length.ToString();
            Regex rx = new Regex(@"(\d+$)", RegexOptions.Compiled | RegexOptions.IgnoreCase);
            MatchCollection matches = rx.Matches(message);
            foreach (Match match in matches)
            {
                duration = match.Value;
                message = message.Substring(0, message.Length - duration.Length);
            }

            string body = String.Format(@"{{
  ""type"": ""message"",
  ""duration"" : {1},
  ""data"" : ""{0}""
}}", message, duration);
           

            await SendPayloadToDevice(deviceId, body);

        }


    }
}
