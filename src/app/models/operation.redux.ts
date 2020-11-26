import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IOperation } from '../interfaces/operation.interface';

export interface IROperation {
    prevOperations: IOperation[],
    operation: IOperation,
    selectedOperationId: number;
}

export class AddOperationAction {
    public static type = "[Operation] Add";

    constructor(public operation: IOperation) { }
}

export class UpdateOperationAction {
    public static type = "[Operation] Update";

    constructor(public operation: IOperation) { }
}

export class DeleteOperationAction {
    public static type = "[Operation] Delete";

    constructor(public id: number) { }
}

export class AddNumberAction {
    public static type = "[Operation] Add number";

    constructor(public num: number) { }
}

export class AddSignAction {
    public static type = "[Operation] Add sign";

    constructor(public sign: string) { }
}

@State<IROperation>({
    name: 'OperationState',
    defaults: {
        prevOperations: [],
        selectedOperationId: null,
        operation: {
            id: 1,
            operations: [],
            numbers: []
        }
    }
})
export class OperationState{
    constructor() {};

    @Selector()
    static getOperation(state: IROperation){
        return state.operation;
    }

    @Selector()
    static getPrevOperations(state: IROperation){
        return state.prevOperations;
    }

    @Selector()
    static getSelectedOperation(state: IROperation){
        let index = state.prevOperations.findIndex((operation) => operation.id = state.selectedOperationId);
        if(index !== -1)
        {
            return state.prevOperations[index];
        }
    }    

    @Action(AddOperationAction)
    add(state: StateContext<IROperation>, action: AddOperationAction) {
        state.setState({
            prevOperations: [...state.getState().prevOperations, action.operation],
            operation: {id: state.getState().operation.id + 1, operations: [], numbers: []},
            selectedOperationId: action.operation.id 
        });
    }

    @Action(AddNumberAction)
    addNumber(state: StateContext<IROperation>, action: AddNumberAction) {
        state.setState({
            prevOperations: state.getState().prevOperations,
            operation:{
                id: state.getState().operation.id,
                operations: state.getState().operation.operations,
                numbers: [...state.getState().operation.numbers, action.num]
            },
            selectedOperationId: state.getState().operation.id 
        });
    }

    @Action(AddSignAction)
    addSign(state: StateContext<IROperation>, action: AddSignAction) {
        state.setState({
            prevOperations: state.getState().prevOperations,
            operation:{
                id: state.getState().operation.id,
                operations: [...state.getState().operation.operations, action.sign],
                numbers: state.getState().operation.numbers
            },
            selectedOperationId: state.getState().operation.id 
        });
    }
}