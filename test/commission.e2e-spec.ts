import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CommissionModule } from '../src/commission/commission.module';
import { CommissionDto } from '../src/commission/dto/commission.dto';

describe('CommissionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CommissionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/calculate (POST)', () => {
    it('should use HighTurnover rule', () => {
      const requestDto = {
        date: '2021-01-01',
        amount: 1000.0,
        currency: 'EUR',
        client_id: 1,
      };

      const res: CommissionDto = {
        amount: 0.03,
        currency: 'EUR',
      };

      return request(app.getHttpServer())
        .post('/commission/calculate')
        .send(requestDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(res);
    });

    it('should return 400', () => {
      const requestDto = {
        date: '2021-01-01',
        amount: 1000.0,
        client_id: 1,
      };

      return request(app.getHttpServer())
        .post('/commission/calculate')
        .send(requestDto)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400);
    });
  });
});
