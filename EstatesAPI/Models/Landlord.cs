using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EstatesAPI.Models;

public class Landlord : Person
{
   public List<string> PropertyIds { get; set; }

}
