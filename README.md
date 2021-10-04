**THis is a monorepo for nestjs tryouts**

**The relative paths start from 'apps' rather than from  'src' folder as is the default
with nestjs projects**

Every project has it own runnable nodemon and webpack
with the appropriate external env file and dataSet if required. Please refer to the project documentation

Project lib
-
***Collection of commonly used services and constants. Instead of creating dynamic modules, in monorepo this seem a better fit***

Project Redis (TBD)
-
Refer README.md file under app/redis


Project Graphql (Under construction)
- 
 Refer [README.md](./apps/graphql/README.md) file under apps/graphql

Project ES (Under construction)
-
Refer [README.md ](./apps/es/README.md)file under apps/es

Run `npm install `to install all required dependencies for the entire app