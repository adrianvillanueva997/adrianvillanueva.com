package main

import (
	"log"
	"os"

	"adrian-villanueva.com/src/routes"
	"adrian-villanueva.com/src/routes/feedGenerator"
	"adrian-villanueva.com/src/routes/sitemap"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func initServer() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.StaticFile("/robots.txt", "./public/robots.txt")
	r.StaticFile("/sitemap.xml", "./public/sitemap1.xml")
	r.Delims("{{", "}}")
	r.Use(static.Serve("/blog/assets", static.LocalFile("./assets", false)))
	r.Use(static.Serve("/assets", static.LocalFile("./assets", false)))
	r.LoadHTMLGlob("./templates/*.tmpl.html")
	r.NoRoute(routes.NotFoundHandler())
	return r
}

func initRoutes(engine *gin.Engine) {
	engine.GET("/", routes.IndexHandler())
	engine.GET("/blog/:postName", routes.PostHandler())
	engine.GET("/blog", routes.BlogHandler())
	engine.GET("/contact", routes.ContactHandler())
	engine.GET("/feed", routes.FeedHandler())
	engine.GET("/resume", routes.ResumeHandler())
	engine.GET("/feed/json", feedgenerator.JSONFeedHandler())
	engine.GET("/feed/atom", feedgenerator.ATOMFeedHandler())
	engine.GET("/feed/rss", feedgenerator.RSSFeedHandler())
	engine.GET("/about", routes.AboutHandler())
}

func main() {
	r := initServer()
	initRoutes(r)
	if os.Getenv("ENV") == "BUILD" {

	}
	log.Println("Generating sitemap.xml")
	sitemap.GenerateSiteMap()
	log.Println("Server running!")
	_ = r.Run("0.0.0.0:3000")
}
