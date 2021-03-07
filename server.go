package main

import (
	"adrian-villanueva.com/src/routes"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func initServer() *gin.Engine {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Delims("{{", "}}")
	r.Use(static.Serve("/blog/assets", static.LocalFile("./assets", false)))
	r.LoadHTMLGlob("./templates/*.tmpl.html")
	return r

}

func initRoutes(engine *gin.Engine) {
	engine.GET("/", routes.IndexHandler())
	engine.GET("/blog/:postName", routes.PostHandler())
	engine.GET("/blog", routes.BlogHandler())

}

func main() {
	r := initServer()
	initRoutes(r)
	_ = r.Run()
}
