using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Devices;
using Microsoft.Extensions.Configuration;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        
        // Select one of the following transports used by ServiceClient to connect to IoT Hub.
        private static TransportType s_transportType = TransportType.Amqp;
        //private static TransportType s_transportType = TransportType.Amqp_WebSocket_Only;

        private static string deviceId = "raspi-zero";
        private readonly IotService _service;

        public MessageController(IConfiguration config)
        {
            // The IoT Hub connection string. This is available under the "Shared access policies" in the Azure portal.
            string s_connectionString = config.GetValue<string>("connectionString");
            ServiceClient serviceClient = ServiceClient.CreateFromConnectionString(s_connectionString, s_transportType);
            this._service = new IotService(serviceClient);
        }

        [HttpPost]
        public async Task<bool> Post()
        {
            using (var reader = new StreamReader(Request.Body))
            {
                var body = reader.ReadToEnd();
                await _service.SendPayloadToDevice(deviceId, body);
            }
            return true;
        }

        [HttpPost("/api/slackcommand")]
        public async Task<string> SlackSlashCommand([FromForm]SlackCommand data)
        {
            string message = data.text;
            await _service.SendMessageToDevice(deviceId, message);
            return $"OK - {data.text}";
        }

        [HttpPost("/api/slack")]
        public async Task<Slackevent> SlackEvent([FromBody] Slackevent data)
        {
            if (!String.IsNullOrEmpty(data.challenge))
            {
                return data;
            }
            if (data.@event != null)
            {
                var evt = data.@event;
                string message = evt.text;
                if (message.StartsWith("##"))
                {
                    message = message.Substring(2);
                    message = message.Replace("\"", "'");
                    await _service.SendMessageToDevice(deviceId, message);
                }
            }
            return data;
        }
    }
}
