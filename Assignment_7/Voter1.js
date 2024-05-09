const express=require('express');
const app=express();
const sql=require('mysql2');
const jwt=require('jsonwebtoken');
const bodyParser = require('body-parser');


const appforuserRoutes=require('./Routes/users');
const cors=require('cors');
const config=require('config');
const PORT=config.get("portno");
const encryptionkey=config.get("encryptionkey");
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(cors());
const connectionString = {
    host:  config.get("host"),
    port: config.get("sqlport"),
    database: config.get("database"),
    user: config.get("username"),
    password: config.get("password")
};

app.use("/users",appforuserRoutes);
// app.get("/users/registration",(request,response)=>
// {
//     const connection=sql.createConnection(connectionString);
//     connection.connect();

//     var querytext="select *from user";

//     connection.query(querytext,(error,result)=>
//     {
//         response.setHeader("content-type","application/json");
//         if(error==null)
//             {
//                 response.write(JSON.stringify(result));
//                 connection.end();
//                 response.end();
//             }
//             else{
//                 response.write(JSON.stringify(err));
//                 connection.end();
//                 response.end();
//             }
//     })

// })

app.post("/users/registration",(request,response)=>
{{
    //   console.log(request.body);
      var firstName = request.body.firstName;
      var lastName = request.body.lastName;
      var email = request.body.email;
      var password = request.body.password;
      var phoneNumber = request.body.phoneNumber;
    console.log(firstName);
    const connection=sql.createConnection(connectionString);
    connection.connect();
    let queryText = `Insert into user(firstName,lastName,email,password,phoneNumber) values('${firstName}','${lastName}','${email}','${password}','${phoneNumber}')`;
       console.log(queryText);
       connection.query(queryText, (error, result) => {
            response.setHeader("Content-Type","application/json");
            if(error == null){

                  response.write(JSON.stringify(result));
                  connection.end();
                  response.end();
               }else{
                  response.write(JSON.stringify(error));
                  connection.end();
                  response.end();
               }
       })
}})
app.post("/users/login", (request,response) => {
     
         var email1 = request.body.email;
         var password1 = request.body.password;
        
    
         
          const connection = sql.createConnection(connectionString);
          let queryText = `Select * from user where email = '${email1}' AND password = '${password1}'`;
          connection.query(queryText, (error, result) => {
                // console.log(result[0].firstName, "id =",result[0].id, "98 ======")
                response.setHeader("Content-Type", "application/json");
                if(error == null)
                    {
                      //generates a JSON Web Token (JWT) using the jwt.sign method. The token payload contains the user's ID and first name extracted from the query result.
                      const token = jwt.sign({ id: result[0].id, name: result[0].firstName }, 'encryptionKey');
                      //JSON response with a success status and the generated JWT 
                      response.json({ status: 'success', data: { token, name: result[0].firstName  }});
                   }else
                   {
                      return response.status(401).json({ status: 'error', message: 'Invalid email or password' });
                   }
          })
    
    });

app.get("/users/profile/:firstName", (request,response) => {
        var firstName = request.params.firstName;
        // console.log(firstName, " 120 ===")
        
         const connection = sql.createConnection(connectionString);
         connection.connect();
        //   console.log(firstName, "124 ========");
         let queryText = `SELECT firstName,lastName,email,phoneNumber FROM user where firstName = '${firstName}'`;
        //  console.log(queryText)
         connection.query(queryText, (error, result) =>{
              if(error == null)
                {
              console.log(result, "129 ===");
                response.json({ status: 'success', data:  result });
               
                connection.end(); 
              }
              else{
                    response.write(JSON.stringify(error));
                    connection.end();
                    response.end();
              }
        });
  
})
app.put("/users/profile/:firstName", (request,response) => {
    var firstName = request.params.firstName;
    var firstName1 = request.body.firstName;
    var lastName = request.body.lastName;
    var phoneNumber = request.body.phoneNumber;
 
     const connection = sql.createConnection(connectionString);
     connection.connect();
      // console.log(firstName);
     let queryText = `update user set firstName = '${firstName1}',
                                      lastName = '${lastName}', 
                                      phoneNumber = '${phoneNumber}'
                                      where firstName = '${firstName}'`;
     console.log(queryText)
     connection.query(queryText, (error, result) =>{
          if(error == null){

          console.log(result, "160 ===");
            response.json({ status: 'success', data:  result });
            // const token=jwt.sign({id: result[0].id, name: result[0].firstName },'encryptionKey')
            // response.setHeader(token,'encryptionKey');
            const token = jwt.sign({ id: result.id, name: result.firstName }, 'encryptionKey');
            console.log(token)
            
            let check = jwt.verify(token, 'encryptionKey');
            connection.end();
            
          }
          else{
                 response.write(JSON.stringify(Error));
                connection.end();
                response.end();
          }
     });

})

app.post("/property",(request,response)=>
  {
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var email = request.body.email;
    var password = request.body.password;
    var phoneNumber = request.body.phoneNumber;
  console.log(firstName);
  const connection=sql.createConnection(connectionString);
  connection.connect();
  let queryText = `Insert into user(firstName,lastName,email,password,phoneNumber) values('${firstName}','${lastName}','${email}','${password}','${phoneNumber}')`;
     console.log(queryText);
     connection.query(queryText, (error, result) => {
          response.setHeader("Content-Type","application/json");
          if(error == null){

                response.write(JSON.stringify(result));
                connection.end();
                response.end();
             }else{
                response.write(JSON.stringify(error));
                connection.end();
                response.end();
             }
     })
})

app.listen(PORT,()=>{console.log(".....Server Started at 9999.....")})