import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IOperation } from 'src/app/interfaces/operation.interface';
import { AddNumberAction, AddOperationAction, AddSignAction, DeleteOperationAction, OperationState, UpdateOperationAction } from 'src/app/models/operation.redux';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  @Select(OperationState.getPrevOperations) users$: Observable<IOperation>;
  idCount: Number = 1;

  constructor(private store: Store) { }

  addOperation(operation: IOperation){
    this.store.dispatch(new AddOperationAction(operation));
  }

  addNumber(num: number){
    this.store.dispatch(new AddNumberAction(num));
  }

  addSign(sign: string){
    this.store.dispatch(new AddSignAction(sign));
  }

  getCurrentOperation(){
    return this.store.select(OperationState.getOperation);
  }

  getPrevOperations(){
    return this.store.select(OperationState.getPrevOperations);
  }
}
