using EstatesAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace EstatesAPI.Services;

public class LandlordService
{
    private readonly IMongoCollection<Landlord> _landlordCollection;

    public LandlordService(IOptions<EstateDatabaseSettings> estateDatabaseSettings)
    {
        var mongoClient = new MongoClient(estateDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(estateDatabaseSettings.Value.DatabaseName);

        _landlordCollection = mongoDatabase.GetCollection<Landlord>(
            estateDatabaseSettings.Value.LandlordsCollectionName);
    }

    public async Task<List<Landlord>> GetAsync() =>
       await _landlordCollection.Find(_ => true).ToListAsync();

    public async Task<Landlord> GetAsync(string id) =>
        await _landlordCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Landlord newLandlord) =>
        await _landlordCollection.InsertOneAsync(newLandlord);

    public async Task UpdateAsync(string id, Landlord updatedLandlord) =>
        await _landlordCollection.ReplaceOneAsync(x => x.Id == id, updatedLandlord);

    public async Task RemoveAsync(string id) =>
        await _landlordCollection.DeleteOneAsync(x => x.Id == id);

}
