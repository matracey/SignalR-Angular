using System;
using Newtonsoft.Json;

namespace SignalRAngular.Models
{
    public class Message
    {
        public Message ()
        {
            Id = Guid.NewGuid();
            Timestamp = DateTime.UtcNow;
        }

        [JsonProperty("Id")]
        public Guid Id { get; set; }
        [JsonProperty("Name")]
        
        public string Name { get; set; }
        
        [JsonProperty("Message")]
        public string Content { get; set; }

        public DateTime Timestamp { get; set; }
    }
}