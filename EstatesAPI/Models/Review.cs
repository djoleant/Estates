using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EstatesAPI.Models;

public class Review
{

    [BsonElement("Text")]
    public string Text { get; set; }

    public int Rating { get; set; }

    public string PersonName { get; set; }

}
