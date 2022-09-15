
/*CREATION D'UN SERVEUR WEB PERMETTANT DE RENVOYEZ LE NOM DE L'UTISATEUR SAISIE DANS L'URL SOUS LE PORT 80 */

let http=require('http')
let fs=require('fs')
let url=require('url')

let server = http.createServer()

server.on('request',(request,response)=>{
    response.writeHead(200)
    let query=url.parse(request.url,true).query
    let name=query.name===undefined?'cher ami':query.name
    fs.readFile('index.html','utf8',(err,data)=>{
        if(err){
            response.writeHead(404)
            response.end('Ce fichier n\'existe')
        }
        else{
             response.writeHead(200,{
            'content-type':'text/html;charset=utf-8'
            })
            data=data.replace('{{name}}',name)
            response.end(data)
        }

    })
    
    
    /*
    fs.readFile('index.html',(err,data)=>{
        if(err){
            response.writeHead(404)
            response.end('Ce fichier n\'existe')
        }
        else{
             response.writeHead(200,{
            'content-type':'text/html;charset=utf-8'
            })
            response.end(data)
        }
       
    }) */
   
})

server.listen(80) //80 est le port pour ecouter la reponse du serveur
