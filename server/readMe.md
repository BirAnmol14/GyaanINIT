# Documentation

The documentation is present in documentation.txt and is Node.js based. All the queries support JSON format. 

## Usage

### GET requests
1. Get Short User Information
   - END POINT: /api/users/getinfo?username={username}&short=true
   - METHOD:'GET'
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - info: User Object
       - url: String
     '''

2. Get Detailed User Information
   - END POINT: /api/users/getinfo?username={username}
   - METHOD:'GET'
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - info: User Object
       - url: String
      '''

3. Verifying LoggedIn status
   - END POINT: /api/account/verifyLoginStatus
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - user: Object
              {
                -name: String,
                -username: String,
                profilePic: String
              }
     '''
4. Logout
   - END POINT: /api/account/logout
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
     '''

5. Get A List Of All Registered Users
   - END POINT: /api/users/getAllUsers
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA: A list of Objects
      - [
          {
          -name:String,
          -username:String,
          profilePic:String
          },...
        ]
     '''
6. Search
   - END POINT: /api/tools/search?find={your query}
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA: An object
      - {
          users:[
            {
            -name:String,
            -username:String,
            profilePic:String
            },...
          ],
          articles:[
            {

            },...
          ],
          posts:[
            {

            },...
          ],
          groups:[
            {

            },...
          ]
        }
     '''
7. Get all users present in a call
   - END POINT: /api/tools/getCallUserList?url={meet url}
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode: 200
     - Content-Type:JSON
     - SCHEMA: An Object
      {
          validUrl: boolean ,
          admin: User Object{  -name:String,  -username:String,-profilePic:String} ,
          users:[
                  {
                    User object in the Call,
                    -name:String,
                    -username:String,
                    profilePic:String
                  }, ...
                ] - a list of user objects sorted by lexicographic order on Name
      }
     '''

8. Get Chat in a call
   - END POINT: /api/call/getCallChat?url={meet url}
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode: 200
     - Content-Type:JSON
     - SCHEMA: An Object
      {
          status: boolean ,
          message: String ,
          chats:[
                  {
                    Chat object
                    -user: Object {name: String, username: String ,profilePic: String},
                    -message: String,
                    -time: JavaScript Date Object
                  }, ...
                ] - a list of Chat objects sorted by timestamp in ascending order
      }
     '''

9. Get posts in a topic
   - END POINT: /api/posts/:url1/:url2/:url3
   - METHOD: 'GET'
   - RESPONSE:
     '''
     - statusCode: 200
     - Content-Type:JSON
     - SCHEMA: An Object
      {
          status: boolean ,
          message: String ,
          body:{

          }- a list of Posts for a particulat topic identified by t/topic-slug/topic-id
          category:{

          }-object, category info of the post
      }
     '''

10. Get Categories and Latest posts
    - END POINT: /api/groups
    - METHOD: 'GET'
    - RESPONSE:
      '''
      - statusCode: 200
      - Content-Type:JSON
      - SCHEMA: An Object
      {
          status: boolean ,
          message: String ,
          topics:[
                    {...}...
                  ]
          groups:[
                  {
                    ...
                  }, ...
                ]
          url:string
      }
      '''

11. Get Information about a groups
    - END POINT: /api/groups/group/:topic/:id
    - METHOD: 'GET'
    - RESPONSE:
      '''
      - statusCode: 200
      - Content-Type:JSON
      - SCHEMA: An Object
    {
        status: boolean ,
        message: String ,
        topic_head:{

                  }--Object with Group Category Information
        body:{

        } -Object with group specific information
        url:string
    }
       '''

12. Get categories
	- END POINT: /api/categories.json
	- METHOD: 'GET'
	- RESPONSE:
	  '''
	  - statusCode: 200
	  - Content-Type:JSON
	  - SCHEMA: An Object
		{
			status: boolean ,
			message: String ,
			categories: [{

			},...]
		}
	   '''
	   
13. Get User Badges
	- END POINT: /api/users/getBadges?username={username}
	- METHOD: 'GET'
	- RESPONSE:
	  '''
	  - statusCode: 200
	  - Content-Type:JSON
	  - SCHEMA: An Object
		{
			status: boolean ,
			message: String ,
			badges:{

			}
		}
	  '''
	  
### POST requests

1. Registering a User
   - END POINT: /api/account/register
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
	 - name: String (mandatory)
	 - email: String(mandatory)
	 - password: String(mandatory)
	 - username: String(mandatory)
	 - identity: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
     '''
	 
2. Login a User
   - END POINT: /api/account/login
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - username: String(mandatory)
     - password: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
       - user:Object (if status true)
     '''
	 
3. Test Password Strength
   - END POINT: /api/tools/password_strength
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - password: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - strength: Number between 0 and 100
     '''

4. Generate Call
   - END POINT: /api/call/generateCall
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - meetUrl: String(mandatory)
     - password: String(mandatory)
     - admin_username: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - url: String(if status true, maybe different from the url user sends in body)
     '''
	 
5. Join Call
   - END POINT: /api/call/joinCall
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - meetUrl: String(mandatory)
     - password: String(mandatory)
     - user_name: String(mandatory-username)
   - RESPONSE: 
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - url: String(if status true always same as the url user sends in body)
       - message: String
     '''
	 
6. End Call
   - END POINT: /api/call/endCall
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - callUrl: String(mandatory)
   - RESPONSE: 
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
     '''
7. Verify In Call
   - END POINT: /api/call/verifyUserInCall
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - callUrl: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
     '''
8. Post Message in Call
   - END POINT: /api/call/postMessage
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - callUrl: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
     '''
9. Create Topic
   - END POINT: /api/create/topic/
   - HEADERS: "Content-Type": "application/json"
   - METHOD: 'POST'
   - BODY/PAYLOAD SCHEMA:
     - title: string(mandatory)
     - categoryId: Number(mandatory)
     - description: String(mandatory)
   - RESPONSE:
     '''
     - statusCode:200
     - Content-Type:JSON
     - SCHEMA:
       - status: boolean
       - message: String
       - topic_id: Number
       - topic_slug: String
     '''
	 
10. Create New Post under a Topic
    - END POINT: /api/makepost/
    - HEADERS: "Content-Type": "application/json"
    - METHOD: 'POST'
    - BODY/PAYLOAD SCHEMA:
      - topicId: String(mandatory)
      - description: String (mandatory)
    - RESPONSE:
	  '''
      - statusCode:200
      - Content-Type:JSON
      - SCHEMA:
        - status: boolean
        - message: String
      '''
11. Create Private Topic
    - END POINT: /api/create/topic/privateMessage/
    - HEADERS: "Content-Type": "application/json"
    - METHOD: 'POST'
    - BODY/PAYLOAD SCHEMA:
      - title: string(mandatory)
      - message: String (mandatory)
      - otherUser: String(mandatory)
    - RESPONSE:
	  '''
      - statusCode:200
      - Content-Type:JSON
      - SCHEMA:
        - status: boolean
        - message: String
      '''
12. Create New Private Post under a Private Topic
    - END POINT: /api/makepost/privateMessage/
    - HEADERS: "Content-Type": "application/json"
    - METHOD: 'POST'
    - BODY/PAYLOAD SCHEMA:
      - topicId: String(mandatory)
      - message: String (mandatory)
      - otherUser: String(mandatory)
    - RESPONSE:
	  '''
      - statusCode:200
      - Content-Type:JSON
      - SCHEMA:
        - status: boolean
        - message: String
      '''