using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EstatesAPI.Models;

public abstract class Person
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; } // full name

    public string Contact { get; set; }

    public List<Review> Reviews { get; set; }

}
