package superheroescontroller

import (
	"net/http"

	"github.com/ahnafms/react-query-backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Index(c *gin.Context) {
	var superheroes []models.Superheroes
	models.DB.Find(&superheroes)
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, gin.H{"superheroes": superheroes})
}

func Show(c *gin.Context) {
	var superheroes models.Superheroes
	id := c.Param("id")
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")
	if err := models.DB.First(&superheroes, id).Error; err != nil {
		switch err {
		case gorm.ErrRecordNotFound:
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"message": "Data tidak ditemukan"})
			return
		default:
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		}
	}
	c.JSON(http.StatusOK, gin.H{"superheroes": superheroes, "id": id})
}

func Create(c *gin.Context) {
	var superheroes models.Superheroes
	if err := c.ShouldBindJSON(&superheroes); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	models.DB.Create(&superheroes)
	c.JSON(http.StatusOK, gin.H{"superheroes": superheroes, "message": "Berhasil ditambahkan"})
}

func Update(c *gin.Context) {
	var superheroes models.Superheroes
	id := c.Param("id")
	if err := c.ShouldBindJSON(&superheroes); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	if models.DB.Model(&superheroes).Where("id = ?", id).Updates(&superheroes).RowsAffected == 0 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "tidak dapat mengupdate data superhero"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Berhasil Mengupdate data superhero"})
}

func Delete(c *gin.Context) {
	var superheroes models.Superheroes
	id := c.Param("id")
	if err := c.ShouldBindJSON(&superheroes); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
	}
	if models.DB.Model(&superheroes).Where("id = ?", id).Delete(&superheroes).RowsAffected == 0 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "tidak dapat menghapus data superhero"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Berhasil Menghapus data superhero"})
}
