using EstatesAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace EstatesAPI.Services;

public class PropertyService
{
    private readonly IMongoCollection<Property> _propertyCollection;

    public PropertyService(IOptions<EstateDatabaseSettings> estateDatabaseSettings)
    {
        var mongoClient = new MongoClient(estateDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(estateDatabaseSettings.Value.DatabaseName);

        _propertyCollection = mongoDatabase.GetCollection<Property>(
            estateDatabaseSettings.Value.PropertiesCollectionName);
    }

    public IMongoCollection<Property> Collection { get { return _propertyCollection; } }

    public async Task<List<Property>> GetAsync() =>
       await _propertyCollection.Find(_ => true).ToListAsync();

    public async Task<Property> GetAsync(string id) =>
        await _propertyCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Property newProperty) =>
        await _propertyCollection.InsertOneAsync(newProperty);

    public async Task UpdateAsync(string id, Property updatedProperty) =>
        await _propertyCollection.ReplaceOneAsync(x => x.Id == id, updatedProperty);

    public async Task RemoveAsync(string id) =>
        await _propertyCollection.DeleteOneAsync(x => x.Id == id);

}
