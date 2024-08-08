import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import {Server} from 'http'


let server: Server



async function main() {
    try{
        await mongoose.connect(config.database_url as string );




        // console.log("server thke assi", config.database_url)
       server = app.listen( config.port, () => {
            console.log(`My app listening on port ${config.port}`)
          })

          
    }catch(err){
        console.log( "server vitor error hoise, plase check.." ,err)
    }
  
}




// asyncrons code handle 
process.on('unhandledRejection', () => {
    console.log('asyncronus unhandledRejection is detected, shutting down..')

    if(server){
        server.close(()=> {
            process.exit(1)
        })
    }


    process.exit(1)
})





// syncronus code handle 
process.on('uncaughtException', () => {
    console.log('syncrounus uncaughtException is detected, shutting down..')
    process.exit(1)
})



main()


