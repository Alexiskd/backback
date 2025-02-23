import { Module } from '@nestjs/common';
import { ShippingDocketService } from './shipping-docket.service';
import { ShippingDocketController } from './shipping-docket.controller';

@Module({
  controllers: [ShippingDocketController],
  providers: [ShippingDocketService],
})
export class ShippingDocketModule {}
