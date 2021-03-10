import {Router} from "express";
import eventoController from '../controladores/evento.controlador';
import { autenticacion } from '../middlewares/autenticacion';

const eventoRutas = Router();

eventoRutas.post('/registrar', eventoController.prototype.registro);
eventoRutas.get('/mostrarEvento',autenticacion, eventoController.prototype.getEvento);
eventoRutas.post('/borrarEvento', eventoController.prototype.borrarEvento);
eventoRutas.post('/apuntarse', eventoController.prototype.apuntarse);
eventoRutas.post('/desapuntarse', eventoController.prototype.desapuntarse);
eventoRutas.post('/buscarEvento', eventoController.prototype.buscarEvento);
eventoRutas.post('/guardar', eventoController.prototype.guardar);

export default eventoRutas;