﻿using BotLibrary.Entities;
using BotWebApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace BotWebApi.Controllers
{
    
    public class CandidatesController : ApiController
    {
        IBotContext _context = new DummyBotContext();

        [HttpGet]
        public HttpResponseMessage All()
        {
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent(JsonConvert.SerializeObject(_context.Candidates, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                })),
            };
        }

        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            HttpResponseMessage response;
            var foundedCandidate = _context.Candidates.First(x => x.Id == id);
            if (foundedCandidate != null)
            {
                response = new HttpResponseMessage()
                { 
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(JsonConvert.SerializeObject(foundedCandidate, Formatting.Indented, new JsonSerializerSettings
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    }))
                };
            }
            else
            {
                response = new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            return response;
        }

        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            HttpResponseMessage response;
            var foundedCandidate = _context.Candidates.First(x => x.Id == id);
            if(foundedCandidate != null)
            { 
                _context.Candidates.Remove(foundedCandidate);
                if (_context.Candidates.Any(x => x != foundedCandidate)) 
                {
                    response = new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                }
            }
            else
            {
                response = new HttpResponseMessage(HttpStatusCode.NoContent);
            }
            return response;
       }
       
        [HttpPost]
        public HttpResponseMessage Add([FromBody]JObject entity)
       {
            HttpResponseMessage response = new HttpResponseMessage();
            var newCandidate = entity.ToObject<Candidate>();
           // _context.Candidates.Add();
            response.StatusCode = HttpStatusCode.Created;
            //make connections
            return response;
            {

            }

        }

    }

    public class Transport
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
    }
}
