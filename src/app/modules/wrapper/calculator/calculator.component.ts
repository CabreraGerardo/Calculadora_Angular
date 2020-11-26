import { Component, OnInit } from '@angular/core';
import { IOperation } from 'src/app/interfaces/operation.interface';
import { OperationService } from 'src/app/services/operation.service/operation.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  buttons: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
  operation: IOperation = {
    id: 0,
    operations: [],
    numbers: []
  };
  number: string = "";

  prevOp: IOperation[] = [];

  current: string = "";
  finished: boolean = false;

  constructor(private operationService: OperationService) { }

  ngOnInit(): void {    
    this.operationService.getCurrentOperation().subscribe((next) => {
      this.operation = next;
    });

    this.operationService.getPrevOperations().subscribe((next) => {
      this.prevOp = next;
    });
  }

  onPressedNumber(num: string){
    this.number = this.number.concat(num);
    this.current = this.finished ? num : this.current + (num);
    this.finished = false;
  }

  onPressedOperation(op: string){
    this.operationService.addSign(op);

    if(this.finished)
    {   
      this.operationService.addNumber(parseFloat(this.current));
    }
    else
    {
      this.operationService.addNumber(parseFloat(this.number));
    }
    
    this.current = this.current + (op);
    
    this.number = "";
    this.finished = false;
  }

  calculate(){
    this.operationService.addNumber(parseFloat(this.number));
    
    let res = 0;
    this.operation.numbers.forEach((item, index) => {
      if(index == 0)
      {
        res = item;
      }
      else if(index != this.operation.numbers.length)
      {
        switch(this.operation.operations[index - 1]){
          case "+":
            res += item;
            break;
          case "-":
            res -= item;
            break;
          case "*":
            res *= item;
            break;
          case "/":
            res /= item;
            break;
        }
      }
    });

    this.operationService.addOperation(this.operation);

    this.current = res.toString();
    this.finished = true;
    this.number = "";
  }

  formatOp(op: IOperation){
    let operation = "";
    let res = 0;

    op.numbers.forEach((item, index) => {
      if(index == 0)
      {
        operation = item.toString();
        res = item;
      }
      else if(index != op.numbers.length)
      {
        operation += op.operations[index - 1] + item;
        switch(op.operations[index - 1]){
          case "+":
            res += item;
            break;
          case "-":
            res -= item;
            break;
          case "*":
            res *= item;
            break;
          case "/":
            res /= item;
            break;
        }
      }
    });

  operation = `${operation} = ${res}`;

    return operation;
  }
}
