namespace EstatesAPI.Models;

public class EstateDatabaseSettings
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
    public string PropertiesCollectionName { get; set; }
    public string LandlordsCollectionName { get; set; }
}
