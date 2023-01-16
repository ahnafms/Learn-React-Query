package models

type Superheroes struct {
	Id       int64  `gorm:"primaryKey" json:"id"`
	Name     string `gorm:"type:varchar(64)" json:"name"`
	AlterEgo string `gorm:"type:varchar(64)" json:"alterEgo"`
}
