using Newtonsoft.Json;

namespace SignalRAngular
{
    public class Subtitle
    {
        [JsonProperty("Text")]
        public string Text { get; set; }
        
        [JsonIgnore]
        public string LastUpdatedBy { get; set; }
    }
}