// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { TodoTask, TodoList, ShoppingItem } = initSchema(schema);

export {
  TodoTask,
  TodoList,
  ShoppingItem
};