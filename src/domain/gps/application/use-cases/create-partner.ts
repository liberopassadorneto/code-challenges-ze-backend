import { Either, left, right } from '@/core/errors/either';
import { Partner } from '../../enterprise/entities/partner';
import { Address } from '../../enterprise/entities/value-objects/address';
import { CoverageArea } from '../../enterprise/entities/value-objects/coverage-area';
import { PartnersRepository } from '../repositories/partners.repository';
import { PartnerAlreadyExistsError } from './errors/partner-already-exists.error';

interface CreatePartnerUseCaseRequest {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageArea;
  address: Address;
}

type CreatePartnerUseCaseResponse = Either<
  PartnerAlreadyExistsError,
  { partner: Partner }
>;

export class CreatePartnerUseCase {
  constructor(private readonly partnersRepository: PartnersRepository) {}

  async execute({
    tradingName,
    ownerName,
    document,
    coverageArea,
    address,
  }: CreatePartnerUseCaseRequest): Promise<CreatePartnerUseCaseResponse> {
    const partnerAlreadyExists =
      await this.partnersRepository.findByDocument(document);

    if (partnerAlreadyExists) {
      return left(new PartnerAlreadyExistsError());
    }

    const partner = Partner.create({
      tradingName,
      ownerName,
      document,
      coverageArea: CoverageArea.create({
        coordinates: coverageArea.getCoordinates(),
      }),
      address: Address.create({
        coordinates: address.getCoordinates(),
      }),
    });

    await this.partnersRepository.create(partner);

    return right({ partner });
  }
}
