using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace EstatesAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class PropertyController : ControllerBase
{
    private readonly PropertyService _propertyService;
       
    public PropertyController(PropertyService propertyService) =>
        _propertyService = propertyService;

    // Get:

    [HttpGet]
    [Route("GetAllProperties")]
    public async Task<List<Property>> Get() =>
        await _propertyService.GetAsync();

    [HttpGet]
    [Route("GetProperty/{id:length(24)}")]
    public async Task<IActionResult> Get(string id)
    {
        var property = await _propertyService.GetAsync(id);

        if (property is null)
        {
            return NotFound();
        }

        return Ok(property);
    }

    [HttpGet]
    [Route("FilterProperties")]
    public async Task<IActionResult> Filter([FromQuery] string city, decimal? minArea, decimal? maxArea, PropertyType? propertyType, decimal? minPrice, decimal? maxPrice, bool? petFriendly)
    {
        var builder = Builders<Property>.Filter;
        FilterDefinition<Property> filter = builder.Empty;//builder.Eq(p=>p.CityName,city) & builder.Gte(p=>p.Area, minArea);
        if (!string.IsNullOrEmpty(city))
            filter = filter & builder.Eq(p => p.CityName, city);
        if (minArea != null)
            filter = filter & builder.Gte(p => p.Area, minArea);
        if (maxArea != null)
            filter = filter & builder.Lte(p => p.Area, maxArea);
        if (propertyType != null) 
            filter=filter& builder.Eq(p => p.PropertyType, propertyType);
        if(minPrice!=null)
            filter = filter & builder.Gte(p => p.Price, minPrice);
        if(maxPrice!=null)
            filter=filter & builder.Lte(p => p.Price, maxPrice);
        if (petFriendly != null)
            filter = filter & builder.Eq(p => p.PetFriendly, petFriendly);
      
        var properties = _propertyService.Collection.Find(filter);
        return Ok(await properties.ToListAsync());
    }

    // Post:

    [HttpPost]
    [Route("AddProperty")]
    public async Task<IActionResult> Post(Property newProperty)
    {
        await _propertyService.CreateAsync(newProperty);

        return CreatedAtAction(nameof(Get), new { id = newProperty.Id }, newProperty);
    
    }

    // Put:

    [HttpPut]
    [Route("EditProperty/{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Property updatedProperty)
    {
        var property = await _propertyService.GetAsync(id);
        if (property is null)
        {
            return NotFound();
        }

        updatedProperty.Id = property.Id;

        await _propertyService.UpdateAsync(id, updatedProperty);

        return NoContent();
    }

    // Delete:

    [HttpDelete]
    [Route("DeleteProperty/{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var property = await _propertyService.GetAsync(id);
        if (property is null)
        {
            return NotFound();
        }

        await _propertyService.RemoveAsync(id);

        return NoContent();
    }


}
