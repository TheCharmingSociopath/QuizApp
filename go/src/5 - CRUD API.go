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
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Genre string `json:"genre"`
}
type Question struct {
	ID       uint   `json:"id"`
	Question string `json:"question"`
	Opt1     string `json:"opt1"`
	Opt2     string `json:"opt2"`
	Opt3     string `json:"opt3"`
	Opt4     string `json:"opt4"`
	Ans1     bool   `json:"ans1"`
	Ans2     bool   `json:"ans2"`
	Ans3     bool   `json:"ans3"`
	Ans4     bool   `json:"ans4"`
	QuizId   uint   `json:"QuizID,string"`
}

func main() {
	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}
	defer db.Close()

	db.AutoMigrate(&Person{})
	db.AutoMigrate(&Quiz{})
	db.AutoMigrate(&Question{})
	r := gin.Default()

	r.POST("/people", CreateAccount)
	r.POST("/authenticate/", Login)

	private := r.Group("/private")
	{
		private.GET("/quiz-list/", ViewAllQuizzes)
		private.POST("/CreateQuiz/", CreateQuiz)
		private.GET("/AllPeople/", ListPeople)
		private.GET("/GetQuestion/:id", GetQuestion)
		private.PUT("/UpdateQuestion/:id", UpdateQuestion)
		private.POST("/DeleteQuiz/:id", DeleteQuiz)
		private.POST("/DeletePerson/:id", DeletePerson)
		private.POST("/AddQuestion/", AddQuestion)
		private.POST("/delete-question/:id", DeleteQuestion)
		private.GET("/question-list/:id", ListQuestions)
	}
	private.Use(AuthRequired())

	r.Run(":8080") // Run on port 8080
}

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		fmt.Println("AuthReqAuthReqAuthReq==============================")
		// session := sessions.Default(c)
		user, err := store.Get(c.Request, "session-name")
		fmt.Println(err)
		fmt.Println("AuthRequired", err, user.Values)
		if user.Values["logged-in"] == true {
			// Continue down the chain to handler etc
			c.Next()
		} else {
			// You'd normally redirect to login page
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid session token"})
		}
	}
}

func Login(c *gin.Context) {
	var person Person
	var received_person Person
	c.BindJSON(&received_person)
	d := db.Where("email = ?", received_person.Email).First(&person)
	fmt.Println("login", d)
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")

	if person.Email == received_person.Email && person.Password == received_person.Password {
		session, err := store.Get(c.Request, "session-name")
		session.Values["email"] = person.Email
		session.Values["id"] = person.ID
		session.Values["logged-in"] = true
		session.Save(c.Request, c.Writer)

		fmt.Println("login", session.Values, err)

		c.JSON(200, "Authenticated")
	} else {
		c.JSON(200, "User Not Found")
	}
}

func DeleteQuiz(c *gin.Context) {
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")
	id := c.Params.ByName("id")
	var quiz Quiz
	d := db.Where("id = ?", id).Delete(&quiz)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuestion(c *gin.Context) {
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")
	id := c.Params.ByName("id")
	var question Question
	d := db.Where("id = ?", id).Delete(&question)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeletePerson(c *gin.Context) {
	c.Header("access-control-allow-origin", "http://localhost:3000")
	c.Header("access-control-allow-credentials", "true")
	id := c.Params.ByName("id")
	var person Person
	d := db.Where("id = ?", id).Delete(&person)
	fmt.Println(d)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdateQuestion(c *gin.Context) {
	var question Question
	id := c.Params.ByName("id")
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.BindJSON(&question)
	db.Save(&question)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	c.JSON(200, question)
}

func CreateAccount(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	db.Create(&person)
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented

	session, _ := store.Get(c.Request, "session-name")
	session.Values["email"] = person.Email
	session.Values["id"] = person.ID
	session.Values["logged-in"] = true
	session.Save(c.Request, c.Writer)

	c.JSON(200, person)
}

func AddQuestion(c *gin.Context) {
	var question Question
	// fmt.Println(c.ContentType())
	c.BindJSON(&question)
	fmt.Println(question)
	db.Create(&question)
	c.Header("access-control-allow-origin", "*")
	// c.Header("access-control-allow-credentials", "true")
	c.JSON(200, question)
}

func CreateQuiz(c *gin.Context) {
	var quiz Quiz
	c.BindJSON(&quiz)
	db.Create(&quiz)
	c.Header("access-control-allow-origin", "*")
	// c.Header("access-control-allow-credentials", "true")
	c.JSON(200, quiz)
}

func GetQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var question Question
	// fmt.Println("id = ", id)
	if err := db.Where("id = ?", id).First(&question).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println("err= ", err)
	} else {
		c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
		c.JSON(200, question)
	}
	// fmt.Println("GetQuestion", question)
}

func ViewAllQuizzes(c *gin.Context) {
	var quiz []Quiz
	c.Header("access-control-allow-origin", "*")
	// c.Header("access-control-allow-credentials", "true")
	if err := db.Find(&quiz).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, quiz)
	}
}

func ListQuestions(c *gin.Context) {
	var question []Question
	c.Header("access-control-allow-origin", "*")
	// c.Header("access-control-allow-credentials", "true")
	quizid := c.Params.ByName("id")
	db.Where("quiz_id = ?", quizid).Find(&question)
	// if err != nil {
	// 	c.AbortWithStatus(404)
	// 	fmt.Println("error= ", err)
	// } else {
	c.JSON(200, question)
	// }
}

func ListPeople(c *gin.Context) {
	var people []Person
	c.Header("access-control-allow-origin", "*")
	// c.Header("access-control-allow-credentials", "true")
	if err := db.Find(&people).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println("error = ", err)
	} else {
		c.JSON(200, people)
	}
}
