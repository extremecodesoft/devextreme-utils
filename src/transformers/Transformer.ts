export interface Transformer<T, R = any> {
  execute(data: T): R;
}