"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evento_controlador_1 = __importDefault(require("../controladores/evento.controlador"));
const autenticacion_1 = require("../middlewares/autenticacion");
const eventoRutas = express_1.Router();
eventoRutas.post('/registrar', evento_controlador_1.default.prototype.registro);
eventoRutas.get('/mostrarEvento', autenticacion_1.autenticacion, evento_controlador_1.default.prototype.getEvento);
eventoRutas.post('/borrarEvento', evento_controlador_1.default.prototype.borrarEvento);
eventoRutas.post('/apuntarse', evento_controlador_1.default.prototype.apuntarse);
eventoRutas.post('/desapuntarse', evento_controlador_1.default.prototype.desapuntarse);
eventoRutas.post('/buscarEvento', evento_controlador_1.default.prototype.buscarEvento);
eventoRutas.post('/guardar', evento_controlador_1.default.prototype.guardar);
exports.default = eventoRutas;
