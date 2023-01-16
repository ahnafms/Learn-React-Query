package main

import (
	"github.com/ahnafms/react-query-backend/controllers/superheroescontroller"
	"github.com/ahnafms/react-query-backend/models"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	models.ConnectDatabase()
	// corsConfig := cors.DefaultConfig()
	// corsConfig.AllowOrigins = []string{"http://localhost:8080"}
	r.GET("/api/superheroes", superheroescontroller.Index)
	r.GET("/api/superheroes/:id", superheroescontroller.Show)
	r.POST("/api/superheroes", superheroescontroller.Create)
	r.PUT("/api/superheroes/:id", superheroescontroller.Update)
	r.DELETE("/api/superheroes/:id", superheroescontroller.Delete)
	r.Run()
}
