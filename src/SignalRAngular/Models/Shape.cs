using Newtonsoft.Json;

namespace SignalRAngular
{
    public class Shape
    {
        [JsonProperty("left")]
        public double Left { get; set; }
        
        [JsonProperty("top")]
        public double Top { get; set; }
        
        [JsonIgnore]
        public string LastUpdatedBy { get; set; }
    }
}