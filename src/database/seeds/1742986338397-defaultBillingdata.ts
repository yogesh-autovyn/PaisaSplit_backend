import { MigrationInterface, QueryRunner } from 'typeorm';
import { billingDemoData } from '../seedData/billing.seed';

export class DefaultBillingdata1742986338397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const data of billingDemoData) {
      await queryRunner.query(`INSERT INTO billings (year, month, status) VALUES (?, ?, ?)`, [
        data.year,
        data.month,
        data.status,
      ]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const data of billingDemoData) {
      await queryRunner.query(`DELETE FROM billings WHERE year = ? AND month = ? AND status = ?`, [
        data.year,
        data.month,
        data.status,
      ]);
    }
  }
}
