package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/sessions"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB // declaring the db globally
var err error
var store = sessions.NewCookieStore([]byte("secret"))

type Person struct {
	ID        uint   `json:"id"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}
type Quiz struct {
	ID     uint   `json:"id`
	name   string `json:"name"`
	genere string `json:"genere"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Person{})
	r := gin.Default()

	r.POST("/people", CreateAccount)
	r.POST("/authenticate/", Login)

	private := r.Group("/private")
	{
        r.GET("/quiz-list/", ViewAllQuizzes)
        r.POST("/CreateQuiz/", CreateQuiz)
		r.GET("/people/:id", GetPerson)
		r.PUT("/people/:id", UpdatePerson)
		r.DELETE("/people/:id", DeletePerson)
	}
	private.Use(AuthRequired())
	r.Run(":8080") // Run on port 8080
}

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		// session := sessions.Default(c)
		user, _ := store.Get(c.Request, "session-name")
		if user == nil {
			// You'd normally redirect to login page
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session token"})
		} else {
			// Continue down the chain to handler etc
			c.Next()
		}
	}
}

func Login(c *gin.Context) {
	var person Person
	var received_person Person
	c.BindJSON(&received_person)
	d := db.Where("email = ?", received_person.Email).First(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	if person.Email == received_person.Email && person.Password == received_person.Password {
		session, err := store.Get(c.Request, "session-name")
		session.Values["email"] = person.Email
		session.Values["id"] = person.ID
		session.Save(c.Request, c.Writer)

		fmt.Println(session.Values, err)

		c.JSON(200, "Authenticated")
	} else {
		c.JSON(200, "User Not Found")
	}
}

func DeletePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
	var person Person
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&person)
	db.Save(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, person)
}

func CreateAccount(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	db.Create(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented

	session, _ := store.Get(c.Request, "session-name")
	session.Values["email"] = person.Email
	session.Values["id"] = person.ID
	session.Save(c.Request, c.Writer)

	c.JSON(200, person)
}

func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	db.Create(&quiz)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, quiz)
}

func GetPerson(c *gin.Context) {
	id := c.Params.ByName("id")
	var person Person
	if err := db.Where("id = ?", id).First(&person).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, person)
	}
}

func ViewAllQuizzes(c *gin.Context) {
	var quiz []Quiz
	c.Header("access-control-allow-origin", "*")
	c.Header("access-control-allow-credentials", "true")
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, quiz)
	}
}
