using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstatesAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class LandlordController : ControllerBase
{
    private readonly LandlordService _landlordService;
    private readonly PropertyService _propertyService;

    public LandlordController(LandlordService landlordService, PropertyService propertyService)
    {
        _landlordService = landlordService;
        _propertyService = propertyService;

    }

    // Get:

    [HttpGet]
    [Route("GetAllLandlords")]
    public async Task<List<Landlord>> Get() =>
        await _landlordService.GetAsync();

    [HttpGet]
    [Route("GetLandlord/{id:length(24)}")]
    public async Task<IActionResult> Get(string id)
    {
        var landlord = await _landlordService.GetAsync(id);

        if (landlord is null)
        {
            return NotFound();
        }

        return Ok(landlord);
    }

    // Post:

    [HttpPost]
    [Route("AddLandlord")]
    public async Task<IActionResult> Post(Landlord newLandlord)
    {
        await _landlordService.CreateAsync(newLandlord);

        return CreatedAtAction(nameof(Get), new { id = newLandlord.Id }, newLandlord);

    }

    // Put:

    [HttpPut]
    [Route("EditLandlord/{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Landlord updatedLandlord)
    {
        var landlord = await _landlordService.GetAsync(id);
        if (landlord is null)
        {
            return NotFound();
        }

        updatedLandlord.Id = landlord.Id;

        await _landlordService.UpdateAsync(id, updatedLandlord);

        return NoContent();
    }

    [HttpPut]
    [Route("AddPropertyToLandlord/{idProperty:length(24)}/{idLandlord:length(24)}")]
    public async Task<IActionResult> AddPropertyToLandlord(string idProperty, string idLandlord)
    {
        var landlord = await _landlordService.GetAsync(idLandlord);
        var property = await _propertyService.GetAsync(idProperty);
        if (landlord is null || property is null)
        {
            return NotFound();
        }

        landlord.PropertyIds.Add(idProperty);
        await _landlordService.UpdateAsync(idLandlord, landlord);

        return Ok(landlord);

    }

    // Delete:

    [HttpDelete]
    [Route("DeleteLandlord/{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var landlord = await _landlordService.GetAsync(id);
        if (landlord is null)
        {
            return NotFound();
        }

        await _landlordService.RemoveAsync(id);

        return NoContent();
    }


}
