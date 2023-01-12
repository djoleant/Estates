using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EstatesAPI.Models;

public enum PropertyType
{
    House,
    Apartment
}

public class Property
{

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("Name")]
    public string Name { get; set; }

    public string Description { get; set; }

    public string CityName {  get; set; }

    public string Address { get; set; }

    public List<String> Photos { get; set; }

    public decimal Area { get; set; }

    public PropertyType PropertyType { get; set; }

    public int RoomCount { get; set; }

    public List<String> Amenities { get; set; }
    
    public decimal Price { get; set; }

    public bool ExpensesCovered { get; set; }

    public bool PetFriendly { get; set; }

    public int MinimalRentPeriod { get; set; } // in months

    public List<QA> QAs { get; set; }
}
