import { InMemoryPartnersRepository } from 'test/repositories/in-memory-partners.repository';
import { Address } from '../../enterprise/entities/value-objects/address';
import { CoverageArea } from '../../enterprise/entities/value-objects/coverage-area';
import { CreatePartnerUseCase } from './create-partner';
import { makePartner } from 'test/factories/make-partner';
import { MultiPolygon, Point } from '@/core/types/geo-json';
import { PartnerAlreadyExistsError } from './errors/partner-already-exists.error';

describe('Create Partner', () => {
  let sut: CreatePartnerUseCase;
  let inMemoryPartnersRepository: InMemoryPartnersRepository;

  const coverageAreaCoordinates: MultiPolygon = [
    [
      [
        [30, 20],
        [45, 40],
        [10, 40],
        [30, 20],
      ],
    ],
    [
      [
        [15, 5],
        [40, 10],
        [10, 20],
        [5, 10],
        [15, 5],
      ],
    ],
  ];
  const addressCoordinates: Point = [-46.57421, -21.785741];

  beforeEach(() => {
    inMemoryPartnersRepository = new InMemoryPartnersRepository();
    sut = new CreatePartnerUseCase(inMemoryPartnersRepository);
  });

  it('should create a new partner', async () => {
    const result = await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: '1432132123891/0001',
      coverageArea: CoverageArea.create({
        coordinates: coverageAreaCoordinates,
      }),
      address: Address.create({ coordinates: addressCoordinates }),
    });

    expect(result.isRight()).toBeTruthy();

    if (result.isRight()) {
      expect(inMemoryPartnersRepository.items[0]).toEqual(result.value.partner);
    }
  });

  it('should return error when partner already exists', async () => {
    const partner = makePartner({ document: '1432132123891/0001' });

    await inMemoryPartnersRepository.create(partner);

    const result = await sut.execute({
      tradingName: 'Adega da Cerveja - Pinheiros',
      ownerName: 'Zé da Silva',
      document: partner.document,
      coverageArea: CoverageArea.create({
        coordinates: coverageAreaCoordinates,
      }),
      address: Address.create({ coordinates: addressCoordinates }),
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(PartnerAlreadyExistsError);
  });
});
