import { MatchModel } from '../../../domain/models/match'
import { AddMatchModel } from '../../../domain/usecases/add-match'
import { AddMatchRepository } from '../../protocols/add-match-repository'
import { DbAddMatch } from './db-add-match'

const makeAddMatchRepository = (): AddMatchRepository => {
  class AddMatchRepositoryStub implements AddMatchRepository {
    async add (matchData: AddMatchModel): Promise<AddMatchModel> {
      return new Promise(resolve => resolve(makeFakeMatch()))
    }
  }
  return new AddMatchRepositoryStub()
}

const makeFakeMatch = (): MatchModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_TeamB',
  scoreTeamB: 1,
  winner: 'valid_team'
})

const makeFakeMatchData = (): MatchModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_TeamB',
  scoreTeamB: 1,
  winner: 'valid_team'
})

interface SutTypes {
  sut: DbAddMatch
  addMatchRepositoryStub: AddMatchRepository
}

const makeSut = (): SutTypes => {
  const addMatchRepositoryStub = makeAddMatchRepository()
  const sut = new DbAddMatch(addMatchRepositoryStub)
  return {
    sut,
    addMatchRepositoryStub
  }
}

describe('DbAddMatch Usecase', () => {
  test('Should call AddMatchRepository with correct values', async () => {
    const { sut, addMatchRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMatchRepositoryStub, 'add')
    await sut.add(makeFakeMatchData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      teamA: 'valid_teamA',
      scoreTeamA: 2,
      teamB: 'valid_TeamB',
      scoreTeamB: 1,
      winner: 'valid_team'
    })
  })
})
