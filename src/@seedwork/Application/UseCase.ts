export default abstract class UseCase<IN, OUT> {
  abstract execute(props: IN): OUT | Promise<OUT>;
}
