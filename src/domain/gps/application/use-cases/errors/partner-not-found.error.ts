import { UseCaseError } from '@/core/errors/use-case.error';

export class PartnerNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Partner not found');
  }
}
