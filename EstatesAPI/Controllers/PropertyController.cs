using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;

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
