package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ContactHandler() gin.HandlerFunc {
	return func(context *gin.Context) {
		context.HTML(http.StatusOK, "contact.tmpl.html", gin.H{
			"title": "Contact",
		})
	}
}
