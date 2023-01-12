using EstatesAPI.Models;
using EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstatesAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly ClientService _clientService;

    public ClientController(ClientService clientService)
    {
        _clientService = clientService;
    }

    // Get:

    [HttpGet]
    [Route("GetAllClients")]
    public async Task<List<Client>> Get() =>
        await _clientService.GetAsync();

    [HttpGet]
    [Route("GetClient/{id:length(24)}")]
    public async Task<IActionResult> Get(string id)
    {
        var client = await _clientService.GetAsync(id);

        if (client is null)
        {
            return NotFound();
        }

        return Ok(client);
    }

    // Post:

    [HttpPost]
    [Route("AddClient")]
    public async Task<IActionResult> Post(Client newClient)
    {
        await _clientService.CreateAsync(newClient);

        return CreatedAtAction(nameof(Get), new { id = newClient.Id }, newClient);

    }

    // Put:

    [HttpPut]
    [Route("EditClient/{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Client updatedClient)
    {
        var client = await _clientService.GetAsync(id);
        if (client is null)
        {
            return NotFound();
        }

        updatedClient.Id = client.Id;

        await _clientService.UpdateAsync(id, updatedClient);

        return NoContent();
    }


    // Delete:

    [HttpDelete]
    [Route("DeleteClient/{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var client = await _clientService.GetAsync(id);
        if (client is null)
        {
            return NotFound();
        }

        await _clientService.RemoveAsync(id);

        return NoContent();
    }


}
