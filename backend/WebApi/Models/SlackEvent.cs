using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Models
{

   

    public class Slackevent
    {
        public string token { get; set; }
        public string challenge { get; set; }
        public string type { get; set; }
        public string team_id { get; set; }
        public string api_app_id { get; set; }
        public Event @event { get; set; }
     
        public string event_id { get; set; }
        public int event_time { get; set; }
        public string[] authed_users { get; set; }
    }

    public class Event
    {
        public string client_msg_id { get; set; }
        public string type { get; set; }
        public string text { get; set; }
        public string user { get; set; }
        public string ts { get; set; }
        public string team { get; set; }
        public Block[] blocks { get; set; }
        public string channel { get; set; }
        public string event_ts { get; set; }
        public string channel_type { get; set; }
    }

    public class Block
    {
        public string type { get; set; }
        public string block_id { get; set; }
        public Element[] elements { get; set; }
    }

    public class Element
    {
        public string type { get; set; }
        public Element1[] elements { get; set; }
    }

    public class Element1
    {
        public string type { get; set; }
        public string text { get; set; }
    }


}
