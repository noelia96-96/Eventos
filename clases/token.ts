import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
export default class Token{

    private static data:any = dotenv.config();
    public static secreto:string = Token.data.parsed.SECRETO;
    public static caducidad:string = '365d';//'365d'
    constructor(){}

    static generaToken(payload:any):string{
        //firmar token con clave secreta
        console.log('1'+Token.secreto);
        const miToken = jwt.sign({usuario:payload},Token.secreto,{expiresIn:Token.caducidad});
        return miToken;
    }

    static verificaToken(token:string){
        return new Promise((resolve, reject)=>{
            console.log('2'+token);
            jwt.verify(token, Token.secreto, (err, decoded)=>{
               if(err){
                console.log(err);
                reject(err);
            }
            else{
                resolve(decoded);
            } 
            })   
        }); 
    }
}