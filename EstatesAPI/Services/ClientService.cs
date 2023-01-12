using EstatesAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace EstatesAPI.Services;

public class ClientService
{
    private readonly IMongoCollection<Client> _clientCollection;

    public ClientService(IOptions<EstateDatabaseSettings> estateDatabaseSettings)
    {
        var mongoClient = new MongoClient(estateDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(estateDatabaseSettings.Value.DatabaseName);

        _clientCollection = mongoDatabase.GetCollection<Client>(
            estateDatabaseSettings.Value.ClientsCollectionName);
    }

    public async Task<List<Client>> GetAsync() =>
       await _clientCollection.Find(_ => true).ToListAsync();

    public async Task<Client> GetAsync(string id) =>
        await _clientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Client newClient) =>
        await _clientCollection.InsertOneAsync(newClient);

    public async Task UpdateAsync(string id, Client updatedClient) =>
        await _clientCollection.ReplaceOneAsync(x => x.Id == id, updatedClient);

    public async Task RemoveAsync(string id) =>
        await _clientCollection.DeleteOneAsync(x => x.Id == id);

}
