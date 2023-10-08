import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { LoadPartnerByIdUseCase } from '@/domain/gps/application/use-cases/load-partner-by-id';
import { makePartner } from 'test/factories/make-partner';
import { InMemoryPartnersRepository } from 'test/repositories/in-memory-partners.repository';
import { PartnerNotFoundError } from './errors/partner-not-found.error';

describe('Load Partner By ID', () => {
  let inMemoryPartnersRepository: InMemoryPartnersRepository;
  let sut: LoadPartnerByIdUseCase;

  beforeEach(() => {
    inMemoryPartnersRepository = new InMemoryPartnersRepository();
    sut = new LoadPartnerByIdUseCase(inMemoryPartnersRepository);
  });

  it('should return a partner by id', async () => {
    const newPartner = makePartner({}, new UniqueEntityID('partnerId-01'));

    await inMemoryPartnersRepository.create(newPartner);

    const result = await sut.execute({ partnerId: 'partnerId-01' });

    expect(result.isRight()).toBeTruthy();

    if (result.isRight()) {
      expect(inMemoryPartnersRepository.items[0]).toEqual(result.value.partner);
    }
  });

  it('should return error when partner not found', async () => {
    const result = await sut.execute({ partnerId: 'partnerId-01' });

    expect(result.isLeft()).toBeTruthy();

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(PartnerNotFoundError);
    }
  });
});
