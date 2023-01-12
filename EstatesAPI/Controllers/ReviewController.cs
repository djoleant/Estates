using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstatesAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly LandlordService _landlordService;
    private readonly ClientService _clientService;

    public ReviewController(LandlordService landlordService, ClientService clientService)
    {
        _landlordService = landlordService;
        _clientService = clientService;

    }

    // Put:

    [HttpPut]
    [Route("AddReviewToLandlord/{idLandlord:length(24)}/{idClient:length(24)}/{text}/{rating}")]
    public async Task<IActionResult> AddReviewToLandlord(string idLandlord, string idClient, string text, int rating)
    {
        var landlord = await _landlordService.GetAsync(idLandlord);
        var client = await _clientService.GetAsync(idClient);
        if (landlord is null || client is null)
        {
            return NotFound();
        }



        landlord.Reviews.Add(new Review { Text = text, Rating = rating, PersonName = client.Name });
        await _landlordService.UpdateAsync(idLandlord, landlord);

        return Ok(landlord);

    }

    [HttpPut]
    [Route("AddReviewToClient/{idClient:length(24)}/{idLandlord:length(24)}/{text}/{rating}")]
    public async Task<IActionResult> AddReviewToClient(string idClient, string idLandlord, string text, int rating)
    {
        var landlord = await _landlordService.GetAsync(idLandlord);
        var client = await _clientService.GetAsync(idClient);
        if (client is null || landlord is null)
        {
            return NotFound();
        }



        client.Reviews.Add(new Review { Text = text, Rating = rating, PersonName = landlord.Name });
        await _clientService.UpdateAsync(idClient, client);

        return Ok(client);

    }


}
