﻿using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebUI.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


        }
    }
}