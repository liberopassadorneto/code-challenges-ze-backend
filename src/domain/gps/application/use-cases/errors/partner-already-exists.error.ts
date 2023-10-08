import { UseCaseError } from '@/core/errors/use-case.error';

export class PartnerAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super('Partner already exists');
  }
}
