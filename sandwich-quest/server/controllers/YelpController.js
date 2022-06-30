import { yelpService } from "../services/YelpService"
import BaseController from "../utils/BaseController"
import { logger } from "../utils/Logger"

export class YelpController extends BaseController {
  constructor() {
    super('yelp')
    this.router
    .get('', this.getAll)
    .get('/:id', this.getById)
  }
  async getAll(req, res, next) {
    try {
      const yelps = await yelpService.getAll(req.query)
      res.send(yelps)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const yelp = await yelpService.getById(req.params.id)
      res.send(yelp)
    } catch (error) {
      logger.error(error)
      next(error)
    }
  }
}