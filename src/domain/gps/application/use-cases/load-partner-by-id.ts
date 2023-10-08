import { Either, left, right } from '@/core/errors/either';
import { PartnersRepository } from '@/domain/gps/application/repositories/partners.repository';
import { Partner } from '@/domain/gps/enterprise/entities/partner';
import { PartnerNotFoundError } from './errors/partner-not-found.error';

interface LoadPartnerByIdRequest {
  partnerId: string;
}

type LoadPartnerUseCaseResponse = Either<
  PartnerNotFoundError,
  {
    partner: Partner;
  }
>;

export class LoadPartnerByIdUseCase {
  constructor(private partnersRepository: PartnersRepository) {}

  async execute({
    partnerId,
  }: LoadPartnerByIdRequest): Promise<LoadPartnerUseCaseResponse> {
    const partner = await this.partnersRepository.findById(partnerId);

    if (!partner) {
      return left(new PartnerNotFoundError());
    }

    return right({ partner });
  }
}
