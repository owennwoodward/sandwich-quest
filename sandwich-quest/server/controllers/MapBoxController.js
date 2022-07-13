import {mapBoxService} from "../services/MapBoxService";
import BaseController from "../utils/BaseController";
import {logger} from "../utils/Logger";

export class MapBoxController extends BaseController {
    constructor() {
        super('mapBox')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
    }
    async getAll(req, res, next) {
        try {
            const mapBoxs = await mapBoxService.getAll(req.query)
            res.send(mapBoxs)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const mapBox = await mapBoxService.getById(req.params.id)
            res.send(mapBox)
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}