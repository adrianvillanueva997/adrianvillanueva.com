package main

import (
	"log"
	"time"

	"adrian-villanueva.com/src/routes"
	"adrian-villanueva.com/src/routes/feedGenerator"
	"adrian-villanueva.com/src/routes/sitemap"
	"github.com/gin-contrib/cache"
	"github.com/gin-contrib/cache/persistence"
	"github.com/gin-contrib/gzip"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func initServer() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gzip.Gzip(gzip.DefaultCompression))
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
	store := persistence.NewInMemoryStore(time.Second)
	engine.GET("/", routes.IndexHandler())
	engine.GET("/blog/:postName", routes.PostHandler())
	engine.GET("/blog", cache.CachePage(store, time.Hour, routes.BlogHandler()))
	engine.GET("/contact", cache.CachePage(store, time.Hour, routes.ContactHandler()))
	engine.GET("/feed", cache.CachePage(store, time.Hour, routes.FeedHandler()))
	engine.GET("/resume", cache.CachePage(store, time.Hour, routes.ResumeHandler()))
	engine.GET("/feed/json", cache.CachePage(store, time.Hour, feedgenerator.JSONFeedHandler()))
	engine.GET("/feed/atom", cache.CachePage(store, time.Hour, feedgenerator.ATOMFeedHandler()))
	engine.GET("/feed/rss", cache.CachePage(store, time.Hour, feedgenerator.RSSFeedHandler()))
	engine.GET("/about", cache.CachePage(store, time.Hour, routes.AboutHandler()))
}

func main() {
	r := initServer()
	initRoutes(r)
	log.Println("Generating sitemap.xml")
	sitemap.GenerateSiteMap()
	log.Println("Server running!")
	_ = r.Run("0.0.0.0:3000")
}
