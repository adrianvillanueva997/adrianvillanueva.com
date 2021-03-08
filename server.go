package main

import (
	"log"

	"adrian-villanueva.com/src/routes"
	"adrian-villanueva.com/src/routes/feedGenerator"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func initServer() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Delims("{{", "}}")
	r.Use(static.Serve("/blog/assets", static.LocalFile("./assets", false)))
	r.Use(static.Serve("/assets", static.LocalFile("./assets", false)))
	r.LoadHTMLGlob("./templates/*.tmpl.html")
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
	log.Println("Server running!")
	_ = r.Run("0.0.0.0:3000")
}
