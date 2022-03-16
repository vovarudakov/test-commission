import { Test } from '@nestjs/testing';
import { CommissionController } from './commission.controller';
import { CommissionCalculatorService } from './commission-calculator.service';
import { CommissionModule } from './commission.module';
import { TransactionService } from '../transaction/transaction.service';
import { RequestConverterService } from './transaction/request-converter.service';
import { ConfigService } from '@nestjs/config';

describe('CommissionController', () => {
  let commissionController: CommissionController;
  let commissionCalculatorService: CommissionCalculatorService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CommissionController],
      providers: [
        CommissionCalculatorService,
        {
          provide: TransactionService,
          useValue: {},
        },
        {
          provide: RequestConverterService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: 'Rules',
          useValue: {},
        },
      ],
    }).compile();

    commissionCalculatorService = moduleRef.get<CommissionCalculatorService>(
      CommissionCalculatorService,
    );
    commissionController =
      moduleRef.get<CommissionController>(CommissionController);
  });

  describe('calculate', () => {
    it('should return commission', async () => {
      const req = {
        date: '2021-01-01',
        client_id: 1,
        amount: 0.03,
        currency: 'EUR',
      };
      const result = {
        amount: 0.03,
        currency: 'EUR',
      };
      jest
        .spyOn(commissionCalculatorService, 'calculate')
        .mockImplementation(async () => result);

      expect(await commissionController.calculate(req)).toBe(result);
    });
  });
});
