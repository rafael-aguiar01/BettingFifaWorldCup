import { GroupModel, AddGroupModel, AddGroupRepository } from './db-add-group-protocols'
import { DbAddGroup } from './db-add-group'

const makeAddGroupRepository = (): AddGroupRepository => {
  class AddGroupRepositoryStub implements AddGroupRepository {
    async add (groupData: AddGroupModel): Promise<GroupModel> {
      return new Promise(resolve => resolve(makeFakeGroup()))
    }
  }
  return new AddGroupRepositoryStub()
}

const makeFakeGroup = (): GroupModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  teamB: 'valid_teamB',
  teamC: 'valid_teamC',
  teamD: 'valid_teamD'
})

const makeFakeGroupData = (): AddGroupModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  teamB: 'valid_teamB',
  teamC: 'valid_teamC',
  teamD: 'valid_teamD'
})

interface SutTypes {
  sut: DbAddGroup
  addGroupRepositoryStub: AddGroupRepository
}

const makeSut = (): SutTypes => {
  const addGroupRepositoryStub = makeAddGroupRepository()
  const sut = new DbAddGroup(addGroupRepositoryStub)
  return {
    sut,
    addGroupRepositoryStub
  }
}

describe('DbAddGroup Usecase', () => {
  test('Should call AddGroupRepository with correct values', async () => {
    const { sut, addGroupRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addGroupRepositoryStub, 'add')
    await sut.add(makeFakeGroupData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      teamA: 'valid_teamA',
      teamB: 'valid_teamB',
      teamC: 'valid_teamC',
      teamD: 'valid_teamD'
    })
  })

  test('Should throw if AddGroupRepository throws', async () => {
    const { sut, addGroupRepositoryStub } = makeSut()
    jest.spyOn(addGroupRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeGroupData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an group on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeGroupData())
    expect(account).toEqual(makeFakeGroup())
  })
})
