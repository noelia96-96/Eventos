import { Schema, Document } from "mongoose";
import mongoose from 'mongoose';


//esquema - estructura de la tabla
const eventoSchema = new Schema({
    nombreEvento:{type:String, unique:true},
    creador:{type:String},
    fecha:{type:Date},
    participantes:{type:Array}
},{
    timestamps:true
});

interface IEvento extends Document{
    nombreEvento:string,
    creador:string,
    fecha:Date,
    participantes:Array<String>
}

//modelo de mongoose - que trabaja sobre la tabla Usuario con esquema usuarioSchema
export const Evento = mongoose.model<IEvento>('Evento', eventoSchema);