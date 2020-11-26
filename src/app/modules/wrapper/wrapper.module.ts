import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';
import { WrapperRoutingModule } from './wrapper-routing.module';
import { ButtonComponent } from './calculator/components/button/button.component';


@NgModule({
  declarations: [CalculatorComponent, ButtonComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule
  ]
})
export class WrapperModule { }
