#  docker image for the project
run the following commands:
    docker build -t consolidata:1 .
    docker run -d -it -p 3000:3000  consolidata:3

open localhost:3000 for react frontend

# this project is also hosted on heroku : https://sleepy-retreat-27717.herokuapp.com/

# used jsonforms for custom build  and firebase for backend

# for now I have passed the formSchema in the prop, but later we can add that from react and then render accrodingly

# data is saved to same document under new collection data (Check Firebase for clarification) given access to Austin via email 

for creating new form schema json file should be created : 
schema will be the schema for the form:
properties will be form fieldL

Main form builder is in JsonFormLib.js

Field_name:{
    "type": number/string etc.
    "format" : date
    description: "discription for the field"
    lot of validators and UI is mentioned, which can seen in documentation of jsonforms.io
}


Schema Used for this applciation


{"title": "consolidata schema",
  "schema" : {
    "type": "object",
    "properties": {
      "input_string": {
        "type": "string",
        "minLength": 3,
        "description": "Please enter your input_string",
        "maxLength":5
      },
      "input_number": {
        "type": "number",
        "maximum":100
      },
      "Input_Date": {
        "type": "string",
        "format": "date"
      }
    }
      
  }

}

