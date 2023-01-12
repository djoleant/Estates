using EstatesAPI.Models;
using EstatesAPI.Services;
using global::EstatesAPI.Models;
using global::EstatesAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstatesAPI.Controllers;


[ApiController]
[Route("api/[controller]")]
public class QAController : ControllerBase
{
    private readonly PropertyService _propertyService;

    public QAController(PropertyService propertyService)
    {
        _propertyService = propertyService;
    }

    // Post:

    [HttpPost]
    [Route("Ask/{idProperty:length(24)}/{question}")]
    public async Task<IActionResult> AddReviewToLandlord(string idProperty, string question)
    {
        var property = await _propertyService.GetAsync(idProperty);
        if (property is null)
        {
            return NotFound();
        }

        property.QAs.Add(new QA { Question = question, Answer = null});

        await _propertyService.UpdateAsync(idProperty, property);

        return Ok(property);

    }

    // Put:

    [HttpPut]
    [Route("Answer/{idProperty:length(24)}/{answer}/{questionIndex}")]
    public async Task<IActionResult> AddReviewToClient(string idProperty, string answer, int questionIndex)
    {
        var property = await _propertyService.GetAsync(idProperty);
        if (property is null)
        {
            return NotFound();
        }

        property.QAs[questionIndex].Answer = answer;
        await _propertyService.UpdateAsync(idProperty, property);

        return Ok(property);
    }


}
