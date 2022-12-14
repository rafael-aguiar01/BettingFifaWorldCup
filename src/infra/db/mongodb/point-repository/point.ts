import { AddPointRepository } from '../../../../data/protocols/add-point-repository'
import { PointModel } from '../../../../domain/models/point'
import { AddPointModel } from '../../../../domain/usecases/add-point'
import { MongoHelper } from '../helpers/mongo-helper'

export class PointMongoRepository implements AddPointRepository {
  async add (positionData: AddPointModel): Promise<PointModel> {
    const positionCollection = await MongoHelper.getCollection('points')
    const result = await positionCollection.insertOne(positionData)
    return MongoHelper.map(result.ops[0])
  }

  async list (): Promise<any> {
    const playerCollection = await MongoHelper.getCollection('players')
    const result = await playerCollection.find({}).forEach(async (playerDoc) => {
      console.log(result)
    })
    return result
  }
}
