import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type TodoTaskMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShoppingItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class TodoTask {
  readonly id: string;
  readonly todolistID: string;
  readonly TodoList?: TodoList | null;
  readonly text: string;
  readonly completed: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TodoTask, TodoTaskMetaData>);
  static copyOf(source: TodoTask, mutator: (draft: MutableModel<TodoTask, TodoTaskMetaData>) => MutableModel<TodoTask, TodoTaskMetaData> | void): TodoTask;
}

export declare class TodoList {
  readonly id: string;
  readonly Name?: string | null;
  readonly Description?: string | null;
  readonly TodoTasks?: (TodoTask | null)[] | null;
  readonly tasks?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<TodoList, TodoListMetaData>);
  static copyOf(source: TodoList, mutator: (draft: MutableModel<TodoList, TodoListMetaData>) => MutableModel<TodoList, TodoListMetaData> | void): TodoList;
}

export declare class ShoppingItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly quantity?: number | null;
  readonly index?: number | null;
  readonly acquired: boolean;
  readonly modified?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ShoppingItem, ShoppingItemMetaData>);
  static copyOf(source: ShoppingItem, mutator: (draft: MutableModel<ShoppingItem, ShoppingItemMetaData>) => MutableModel<ShoppingItem, ShoppingItemMetaData> | void): ShoppingItem;
}