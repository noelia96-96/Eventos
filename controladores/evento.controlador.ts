import {Request, Response} from "express";
import Token from "../clases/token";
import { Evento } from '../modelos/evento.modelo';

class eventoController{
    registro(req:Request, res:Response){
        // Evento
        let params = req.body;
        const eventoNuevo= new Evento();
        eventoNuevo.nombreEvento = params.nombreEvento;
        eventoNuevo.creador = params.creador;
        eventoNuevo.fecha = params.fecha;
        eventoNuevo.participantes = params.participantes;
        console.log(eventoNuevo);
        Evento.create(eventoNuevo).then((eventoDB)=>{
            if(!eventoDB){
                console.log('a');
                res.status(500).send({
                    status:'error',
                    mensaje:'error al crear el evento'
                })
            }
            console.log('b');
            res.status(200).send({
                status:'ok',
                mensaje:'se ha creado el evento' + eventoDB.nombreEvento,
                evento: eventoDB
            })
        }).catch(err=>{
            console.log(err);
            res.status(500).send({
                status: 'error',
                error: err
            })
        });
     }

     getEvento(req: Request, res:Response){
         console.log('a');
         Evento.find().sort('fecha').then((eventosDB)=>{
            console.log(eventosDB);
             if(!eventosDB){
                 return res.status(200).send({
                    status:'error',
                    mensaje: 'eventos incorrectos'
                 })
             }
             const eventosQueDevuelvo = new Array<any>();
             eventosQueDevuelvo.push(eventosDB);
             console.log(eventosQueDevuelvo);
             res.status(200).send({
                status:'ok',
                mensaje: 'Muestra de datos correcta',
                evento: eventosQueDevuelvo,
                token: Token.generaToken(eventosQueDevuelvo)
             });
        });
    }

     borrarEvento(req: Request, res:Response){
        let params = req.body;
        console.log(params._id);
        Evento.findByIdAndRemove(params._id).then((eventoDB)=>{
            if(!eventoDB){
                res.status(500).send({
                  status:'error',
                     mensaje:'error al borrar el evento'
                 })
             }
             res.status(200).send({
                 status:'ok',
                 mensaje:'se ha borrado el evento',
                 evento: eventoDB
             })
         }).catch(err=>{
             res.status(500).send({
                 status: 'error',
                 error: err
             })
         });
     }

     apuntarse(req: Request, res:Response){
        let params = req.body;
        const idQueLlega = params._id;
        const listaParticipantes = params.participantes;
        console.log(req.body);
        Evento.findOne({_id: params._id}).then(eventDB => {
            if (!eventDB) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'El evento no existe',
                }); 
            }
            if(eventDB.participantes.length === 4) {
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'El evento está completo',
                }); 
            } else {
                if(eventDB.participantes !== params.participantes) {
                    eventDB.participantes = params.participantes
                } 
            }
            eventDB.save().then( () => {
                res.status(200).send({
                    status: 'ok',
                    mensaje: 'Evento actualizado'
                });
            }).catch(err => {
                res.status(500).send({
                    status: 'error',
                    mensaje: err
                });
            });
     });
    }

    desapuntarse(req: Request, res:Response){
        let params = req.body;
        const idQueLlega = params._id;
        const listaParticipantes = params.participantes;
        console.log(params);
        Evento.findOne({_id: params._id}).then(eventDB => {
            if (!eventDB) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al borrarse del evento',
                }); 
            }
            if(eventDB.participantes.length === 4) {
                return res.status(200).send({
                    status: 'error',
                    mensaje: 'Te has borrado del evento con éxito',
                }); 
            } else {
                if(eventDB.participantes !== params.participantes) {
                    eventDB.participantes = params.participantes
                } 
            }
            eventDB.save().then( () => {
                res.status(200).send({
                    status: 'ok',
                    mensaje: 'Evento actualizado'
                });
            })
     });


    }

    //Recupera el evento para editarlo
    buscarEvento(req: Request, res:Response){
        let params = req.body;
        const idQueLlega = params._id;
        console.log('idQueLlega');
        console.log(params);
        Evento.findById(idQueLlega).then((eventosDB)=>{
            console.log(eventosDB);
             if(!eventosDB){
                 return res.status(200).send({
                    status:'error',
                    mensaje: 'Búsqueda fallida'
                 })
             }
             const eventosQueDevuelvo = new Array<any>();
             eventosQueDevuelvo.push(eventosDB);
             console.log(eventosQueDevuelvo);
             res.status(200).send({
                status:'ok',
                mensaje: 'Búsqueda de eventos exitosa',
                evento: eventosQueDevuelvo,
                token: Token.generaToken(eventosQueDevuelvo)
             });

     });

    }

    //Guardar evento editado
    guardar(req: Request, res:Response){
        let params = req.body;
        const idQueLlega = params._id;

        Evento.findById(idQueLlega).then(eventDB => {
            if (!eventDB) {
                return res.status(400).send({
                    status: 'error',
                    mensaje: 'Error al editar del evento',
                }); 
            }
            if(eventDB.nombreEvento !== params.nombreEvento || eventDB.fecha !== params.fecha) {
                eventDB.nombreEvento = params.nombreEvento
                eventDB.fecha = params.fecha
                } 
          
            eventDB.save().then( () => {
                res.status(200).send({
                    status: 'ok',
                    mensaje: 'Evento editado'
                });
            })
     });
    }
    

}


export default eventoController;