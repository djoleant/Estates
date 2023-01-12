using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EstatesAPI.Models;

public class Client : Person
{
    public bool HasPet { get; set; }
}
