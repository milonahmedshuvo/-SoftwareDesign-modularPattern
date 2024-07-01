import mongoose from 'mongoose';
import app from './app';
import config from './app/config';




async function main() {
    try{
        await mongoose.connect(config.database_url as string );

        console.log("server thke assi", config.database_url)
        app.listen( config.port, () => {
            console.log(`Example app listening on port ${config.port}`)
          })

          
    }catch(err){
        console.log( "server vitor error hoise, plase check.." ,err)
    }
  

  
}


main()


